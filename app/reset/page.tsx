'use client';

import { ForgotPasswordForm } from '@neondatabase/auth-ui';

export default function ResetPage() {
  return (
    <div className="w-full max-w-md">
      <ForgotPasswordForm localization={{} as any} />
    </div>
  );
}