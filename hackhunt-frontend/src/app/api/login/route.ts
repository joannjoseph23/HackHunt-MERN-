import { incrementRequestCount } from '@/lib/metrics';
import * as Sentry from '@sentry/nextjs'; // ✅ Add this line
import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

export async function POST(req: Request) {
  incrementRequestCount('POST');

  try {
    const { email, password } = await req.json();

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');

    const user = await users.findOne({ email, password });

    if (!user) {
      // ✅ Send Sentry error when credentials are invalid
      Sentry.captureMessage('Login failed: Invalid credentials', {
        level: 'warning',
        extra: { email },
      });

      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // ✅ Optionally log successful login (info)
    Sentry.captureMessage('Login successful', {
      level: 'info',
      extra: { email },
    });

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);

    // ✅ Capture internal server errors
    Sentry.captureException(error);

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
