// src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
	VITE_SUPABASE_URL: z.url(),
	VITE_SUPABASE_SBPUBLISHABLE_KEY: z.string(),
	SUPABASE_SERVICE_ROLE_KEY: z.string(),
	NODE_ENV: z.enum(['development', 'production', 'test']),
});

const clientEnvSchema = z.object({
	VITE_SUPABASE_URL: z.url(),
	VITE_SUPABASE_SBPUBLISHABLE_KEY: z.string(),
});

// Validate server environment
export const serverEnv = envSchema.parse(process.env);

// Validate client environment
export const clientEnv = clientEnvSchema.parse(import.meta.env);
