import { create } from 'zustand'
import { SIMMERClient } from '@/services/data/client'

// add this helper near the top with fetchGroupIdBySlug
async function fetchGroupSlugById(
  supabase: SIMMERClient,
  id: string,
): Promise<string | null> {
  const { data, error } = await supabase
    .from('groups')
    .select('short_name')
    .eq('id', id)
    .single()
  if (error) throw error
  return data?.short_name ?? null
}

async function fetchGroupIdBySlug(
  supabase: SIMMERClient,
  slug: string,
): Promise<string | null> {
  const { data, error } = await supabase
    .from('groups')
    .select('id')
    .eq('short_name', slug)
    .single()
  if (error) throw error
  return data?.id ?? null
}

type GroupStore = {
  db: SIMMERClient | null
  groupSlug: string | null
  groupId: string | null
  loading: boolean

  // set the supabase/simmer db client instance so fetchGroupIdBySlug can use it
  setDb: (db: SIMMERClient | null) => void

  // set slug and ensure groupId is resolved (calls fetchGroupIdBySlug when necessary)
  setGroupSlug: (slug: string | null) => Promise<string | null>

  // directly set an id (rarely used)
  setGroupId: (id: string | null) => void

  // resolve slug from id (caches results)
  resolveSlugFromId: (id: string | null) => Promise<string | null>

  // hook used by route beforeLoad to ensure the store has the correct id for a slug
  beforeLoad: (slug: string | null) => Promise<string | null>

  // reset store
  reset: () => void
}

export const useGroupStore = create<GroupStore>((set, get) => {
  // in-memory cache for slug -> id (string | null)
  const cache = new Map<string, string | null>()
  // inverse cache id -> slug
  const inverseCache = new Map<string, string | null>()
  // pending fetches to avoid duplicate requests
  const pending = new Map<string, Promise<string | null>>()

  return {
    db: null,
    groupSlug: null,
    groupId: null,
    loading: false,

    setDb: (db) => {
      set(() => ({ db }))
    },

    setGroupSlug: async (slug) => {
      return await get().beforeLoad(slug ?? null)
    },

    // resolve slug from id (caches results)
    resolveSlugFromId: async (id) => {
      if (!id) return null
      if (inverseCache.has(id)) return inverseCache.get(id) ?? null
      const db = get().db
      if (!db) return null
      const slug = await fetchGroupSlugById(db, id)
      inverseCache.set(id, slug)
      // also populate forward cache if slug present
      if (slug != null) cache.set(slug, id)
      // update store state
      set(() => ({ groupId: id, groupSlug: slug }))
      return slug
    },

    setGroupId: (id) => {
      set(() => ({ groupId: id }))
    },

    beforeLoad: async (slug) => {
      if (!slug) {
        set(() => ({ groupSlug: null, groupId: null }))
        return null
      }

      const { groupSlug: currentSlug, groupId: currentId } = get()

      // If same slug and we already have an id, return it
      if (currentSlug === slug && currentId) return currentId

      // If we've resolved this slug before, use cached value
      if (cache.has(slug)) {
        const cached = cache.get(slug) ?? null
        set(() => ({ groupSlug: slug, groupId: cached }))
        return cached
      }

      // If a fetch for this slug is already in-flight, reuse it
      if (pending.has(slug)) {
        set(() => ({ loading: true }))
        try {
          const id = await pending.get(slug)!
          set(() => ({ groupSlug: slug, groupId: id }))
          return id
        } finally {
          set(() => ({ loading: false }))
        }
      }

      // Ensure db client is present
      const db = get().db
      if (!db) {
        // No DB client — bail out (route or init code should set DB before calling)
        console.warn('useGroupStore.beforeLoad called without DB client set')
        set(() => ({ groupSlug: slug, groupId: null }))
        return null
      }

      // slug changed or id not present -> resolve (fetch and cache)
      set(() => ({ loading: true }))
      const p = (async () => {
        const id = await fetchGroupIdBySlug(db, slug)
        return id ?? null
      })()

      pending.set(slug, p)

      try {
        const id = await p
        cache.set(slug, id)
        set(() => ({ groupSlug: slug, groupId: id }))
        return id
      } finally {
        pending.delete(slug)
        set(() => ({ loading: false }))
      }
    },

    reset: () => {
      set(() => ({ groupSlug: null, groupId: null }))
      // keep db reference so caller doesn't need to re-initialize; remove if you prefer clearing it
    },
  }
})
