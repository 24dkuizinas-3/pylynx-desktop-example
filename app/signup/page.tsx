'use client';

import { useActionState } from 'react';
import { signUpWithEmail } from './actions';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signUpWithEmail, null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0014] to-[#12002b] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_30px_rgba(128,0,255,0.3)]">

        <div className="flex flex-col items-center mb-8">
          <div className="text-5xl mb-2">🦊</div>
          <h1 className="text-3xl font-bold tracking-wide">Join PyLynx</h1>
        </div>

        {state?.error && (
          <p className="text-red-400 text-sm mb-4 text-center">{state.error}</p>
        )}

        <form action={formAction}>
          <div className="mb-4">
            <label className="block text-sm mb-1 text-zinc-300">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1 text-zinc-300">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-1 text-zinc-300">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full px-4 py-3 rounded-xl text-lg font-semibold bg-purple-600 hover:bg-purple-700 shadow-[0_0_20px_rgba(128,0,255,0.4)] transition-all disabled:opacity-50"
          >
            {isPending ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="flex justify-center mt-6 text-sm text-zinc-400">
          <button onClick={() => router.push("/auth/sign-in")} className="hover:text-white transition">
            Already have an account? Log in
          </button>
        </div>

      </div>
    </div>
  );
}