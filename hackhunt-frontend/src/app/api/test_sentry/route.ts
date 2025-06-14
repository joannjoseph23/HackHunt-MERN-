import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    throw new Error('Test Sentry error from /api/test-sentry');
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ message: 'Error captured by Sentry' });
  }
}
