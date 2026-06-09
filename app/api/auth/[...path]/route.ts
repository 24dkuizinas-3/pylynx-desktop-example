import { auth } from '@/lib/auth/server';

// Neon Auth uses .handler() to catch and process all incoming request paths automatically
export const { GET, POST } = auth.handler();
