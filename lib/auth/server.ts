import { createNeonAuth } from '@neondatabase/auth/next/server';

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL || 'https://neon.tech',
  cookies: {
    // Providing a fallback string ensures Next.js compiles without throwing errors during build time
    secret: process.env.NEON_AUTH_COOKIE_SECRET || 'fallback-secret-string-at-least-32-chars-long',
  },
});