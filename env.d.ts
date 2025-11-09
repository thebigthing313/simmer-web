/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_SBPUBLISHABLE_KEY: string;
  readonly VITE_MAPBOX_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly SUPABASE_SERVICE_ROLE_KEY: string;
      readonly SUPABASE_URL: string;
      readonly NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {}