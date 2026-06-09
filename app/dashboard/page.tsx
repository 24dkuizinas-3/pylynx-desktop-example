import { auth } from '@/lib/auth/server';
import { redirect } from 'next/navigation';
import LogoutButton from './LogoutButton';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0014] to-[#12002b] text-white flex flex-col">

      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🦊</div>
          <span className="text-xl font-semibold tracking-wide">
            PyLynx Dashboard
          </span>
        </div>

        <LogoutButton />
      </header>

      <main className="flex flex-col items-center justify-center flex-1 p-10">
        <h1 className="text-4xl font-bold mb-4 tracking-wide">
          Welcome, {session.user.name || session.user.email || "Explorer"}
        </h1>

        <p className="text-zinc-400 max-w-xl text-center mb-10">
          Your PyLynx account is now fully connected to Neon.
          Profiles, avatars, fox‑core settings, and remix tools will all live here.
        </p>

        <div className="flex gap-4">
          <a
            href="/profile"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold shadow-[0_0_20px_rgba(0,128,255,0.4)] transition"
          >
            Edit Profile
          </a>

          <a
            href="/demo"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-lg font-semibold shadow-[0_0_20px_rgba(128,0,255,0.4)] transition"
          >
            Launch OS Demo
          </a>
        </div>
      </main>

    </div>
  );
}