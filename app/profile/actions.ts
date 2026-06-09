'use server';

import { auth } from '@/lib/auth/server';
import { neon } from '@neondatabase/serverless';

export async function updateProfile(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const { data: session } = await auth.getSession();
  
  if (!session?.user) {
    return { error: 'Not authenticated' };
  }

  const name = formData.get('name') as string;
  const avatarUrl = formData.get('avatar_url') as string;

  // Update user name in Neon Auth
  const { error: authError } = await auth.updateUser({ name });

  if (authError) {
    return { error: authError.message || 'Failed to update profile' };
  }

  // Store avatar URL in custom profiles table
  if (avatarUrl) {
    const sql = neon(process.env.DATABASE_URL!);
    
    await sql`
      INSERT INTO profiles (user_id, avatar_url)
      VALUES (${session.user.id}, ${avatarUrl})
      ON CONFLICT (user_id)
      DO UPDATE SET avatar_url = ${avatarUrl}
    `;
  }

  return { success: true };
}