'use server';

import { auth } from '@/lib/auth/server';

export async function requestPasswordReset(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const email = formData.get('email') as string;

  if (!email) {
    return { error: 'Email is required' };
  }

  // Note: SDK methods for password reset are not fully supported yet
  // You should use the UI components instead
  return { 
    error: 'Password reset via custom forms is not fully supported. Please use the Neon Auth UI components.' 
  };
}