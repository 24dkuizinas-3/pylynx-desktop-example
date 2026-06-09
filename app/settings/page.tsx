import { auth } from '@/lib/auth/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0014] to-[#12002b] text-white flex flex-col">

      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🦊</div>
          <span className="text-xl font-semibold tracking-wide">Settings</span>
        </div>

        <a
          href="/dashboard"
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition"
        >
          Back to Dashboard
        </a>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6 tracking-wide">System Settings</h1>

        <p className="text-zinc-400 max-w-xl text-center mb-8">
          Customize your PyLynx experience. Themes, fox‑core animations,
          account preferences, and more will live here.
        </p>

        <div className="w-full max-w-2xl space-y-4">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Account</h2>
            <p className="text-sm text-zinc-400 mb-4">
              Logged in as: {session.user.name || session.user.email}
            </p>
            <a
              href="/profile"
              className="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition"
            >
              Edit Profile
            </a>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Preferences</h2>
            <p className="text-sm text-zinc-400">
              Theme and customization options coming soon.
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}