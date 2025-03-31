import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Validate file type and size
  if (!file.type.startsWith('image/')) {
    return NextResponse.json(
      { error: 'Only images are allowed' },
      { status: 400 }
    );
  }
  if (file.size > 4 * 1024 * 1024) {
    return NextResponse.json(
      { error: 'File too large (max 4MB)' },
      { status: 400 }
    );
  }

  const blob = await put(file.name, file, { access: 'public' });
  return NextResponse.json(blob);
}
