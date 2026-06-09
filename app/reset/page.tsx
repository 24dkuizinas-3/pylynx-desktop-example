'use client';

import { ForgotPasswordForm } from '@neondatabase/auth-ui';

export default function ResetPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-xl">
        <ForgotPasswordForm 
          localization={{
            title: "Reset Password",
            subtitle: "Enter your email to receive a reset link",
            emailLabel: "Email Address",
            emailPlaceholder: "name@example.com",
            submitButtonLabel: "Send Reset Link",
            successMessage: "Check your email for a reset link!",
            backToSignInLabel: "Back to Sign In"
          } as any}
        />
      </div>
    </div>
  );
}
