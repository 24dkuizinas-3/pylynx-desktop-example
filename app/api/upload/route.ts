import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';

export async function POST(request: Request) {
  const { data: session } = await auth.getSession();
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename || !request.body) {
    return NextResponse.json({ error: 'Missing filename or file' }, { status: 400 });
  }

  const blob = await put(`avatars/${session.user.id}-${filename}`, request.body, {
    access: 'public',
  });

  return NextResponse.json(blob);
}