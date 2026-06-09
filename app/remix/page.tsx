import { auth } from '@/lib/auth/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function RemixPage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0014] to-[#12002b] text-white flex flex-col">

      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🦊</div>
          <span className="text-xl font-semibold tracking-wide">Remix Tools</span>
        </div>

        <a
          href="/dashboard"
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition"
        >
          Back to Dashboard
        </a>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 p-10">
        <h1 className="text-4xl font-bold mb-6 tracking-wide">Build. Hack. Remix.</h1>

        <p className="text-zinc-400 max-w-xl text-center mb-8">
          Access tools, templates, and guides for remixing PyLynx.  
          Learn how to modify the bootloader, customize the desktop, build apps,
          and create your own fox‑core powered experiences.
        </p>

        <p className="text-sm text-zinc-500">
          Logged in as: {session.user.name || session.user.email}
        </p>
      </main>

    </div>
  );
}