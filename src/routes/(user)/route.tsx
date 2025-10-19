import {
  Outlet,
  createFileRoute,
  redirect,
  useLocation,
} from '@tanstack/react-router'
import { UserIcon } from 'lucide-react'
import type { MenuGroup } from '@/components/layout/app-sidebar'
import { SidebarWithInset } from '@/components/layout/sidebar-with-inset'
import Logo from '@/assets/simmer-logo.svg?url'
import Favicon from '@/assets/simmer-favicon.svg?url'
import { useSidebar } from '@/components/ui/sidebar'
import {
  groupInvitesCollection,
  groupProfilesCollection,
  groupsCollection,
  profilesCollection,
} from '@/db/collections'

export const Route = createFileRoute('/(user)')({
  beforeLoad: ({ context }) => {
    const { auth } = context
    if (!auth.user_id || !auth.profile_id) throw redirect({ to: '/login' })
    return {
      user_id: auth.user_id,
      profile_id: auth.profile_id,
      groups: auth.groups,
      default_group_id: auth.default_group,
    }
  },
  component: RouteComponent,
  loader: async () => {
    await Promise.allSettled([
      profilesCollection.preload(),
      groupsCollection.preload(),
      groupInvitesCollection.preload(),
      groupProfilesCollection.preload(),
    ])
  },
})

function RouteComponent() {
  const { pathname } = useLocation()

  const menuItems: Array<MenuGroup> = [
    {
      label: 'My Account',
      items: [
        {
          label: 'Profile',
          icon: <UserIcon />,
          subItems: [
            {
              title: 'Home',
              link: { to: '/' },
              isActive: pathname === '/',
            },
            {
              title: 'Personal Information',
              link: { to: '/profile' },
              isActive: pathname === '/profile',
            },
            {
              title: 'Settings',
              link: { to: '/settings' },
              isActive: pathname === '/settings',
            },
          ],
        },
      ],
    },
  ]

  return (
    <SidebarWithInset header={<SidebarHeader />} menuGroups={menuItems}>
      <Outlet />
    </SidebarWithInset>
  )
}

function SidebarHeader() {
  const { state } = useSidebar()
  return (
    <div className="w-full flex flex-row justify-center">
      {state === 'collapsed' && (
        <img src={Favicon} alt="SIMMER favicon" className="size-6 mt-2" />
      )}
      {state === 'expanded' && (
        <img src={Logo} alt="SIMMER logo" className="w-[200px]" />
      )}
    </div>
  )
}
