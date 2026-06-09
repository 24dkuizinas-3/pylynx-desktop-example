import { ForgotPasswordForm } from '@neondatabase/auth-ui';
import { authClient } from '@/lib/auth/client';

export default function ResetPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0014] to-[#12002b] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <ForgotPasswordForm
          authClient={authClient}
          redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/auth/reset-password`}
          onSuccess={(data) => {
            console.log('Reset email sent to:', data.email);
          }}
        />
      </div>
    </div>
  );
}