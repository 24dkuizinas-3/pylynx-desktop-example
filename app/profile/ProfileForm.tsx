'use client';

import { useActionState, useState } from 'react';
import { updateProfile } from './actions';

export default function ProfileForm({ user }: { user: any }) {
  const [state, formAction, isPending] = useActionState(updateProfile, null);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar_url || '');
  const [uploading, setUploading] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });

      const blob = await response.json();
      setAvatarUrl(blob.url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {state?.success && (
        <p className="text-green-400 text-sm mb-4 text-center">Profile updated successfully!</p>
      )}
      {state?.error && (
        <p className="text-red-400 text-sm mb-4 text-center">{state.error}</p>
      )}

      <form action={formAction} className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img
            src={avatarUrl || '/default-avatar.png'}
            alt="avatar"
            className="w-32 h-32 rounded-full border border-white/20 object-cover mb-4"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            disabled={uploading}
            className="text-sm text-zinc-300"
          />
          {uploading && <p className="text-sm text-zinc-400 mt-2">Uploading...</p>}
        </div>

        <input type="hidden" name="avatar_url" value={avatarUrl} />

        <div className="w-full mb-6">
          <label className="block text-sm mb-1 text-zinc-300">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={user.name || ''}
            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="w-full mb-6">
          <label className="block text-sm mb-1 text-zinc-300">Email</label>
          <input
            type="email"
            value={user.email || ''}
            disabled
            className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-zinc-500 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={isPending || uploading}
          className="w-full px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-lg font-semibold shadow-[0_0_20px_rgba(128,0,255,0.4)] transition disabled:opacity-50"
        >
          {isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </>
  );
}