import { incrementRequestCount } from '@/lib/metrics';
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb';

export async function POST(req: NextRequest) {
  incrementRequestCount('POST');

  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db('hackhunt');

    await db.collection('hackathons_temp').insertOne(body);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Failed to create temp summary:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to save temp summary' },
      { status: 500 }
    );
  }
}
