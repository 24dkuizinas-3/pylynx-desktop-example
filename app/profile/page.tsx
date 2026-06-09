import { auth } from '@/lib/auth/server';
import { redirect } from 'next/navigation';
import { neon } from '@neondatabase/serverless';
import ProfileForm from './ProfileForm';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect('/login');
  }

  // Fetch avatar from profiles table
  const sql = neon(process.env.DATABASE_URL!);
  const profiles = await sql`
    SELECT avatar_url FROM profiles WHERE user_id = ${session.user.id}
  `;

  const userWithAvatar = {
    ...session.user,
    avatar_url: profiles[0]?.avatar_url || null,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0014] to-[#12002b] text-white flex flex-col">
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🦊</div>
          <span className="text-xl font-semibold tracking-wide">Edit Profile</span>
        </div>

        <a
          href="/dashboard"
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition"
        >
          Back
        </a>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 p-10">
        <ProfileForm user={userWithAvatar} />
      </main>
    </div>
  );
}