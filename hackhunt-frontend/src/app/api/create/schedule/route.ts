import clientPromise from '../../../../../lib/mongodb';
import { incrementRequestCount } from '@/lib/metrics';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  incrementRequestCount('POST');

  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db('hackhunt');

    await db.collection('hackathon_schedules').insertOne(body);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Failed to create schedule:', err);
    return NextResponse.json({ success: false, message: 'Failed to save schedule' }, { status: 500 });
  }
}
