// hackhunt-frontend/src/app/api/create/overview/route.ts

import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb';
import { incrementRequestCount } from '@/lib/metrics';

export async function POST(req: NextRequest) {
  incrementRequestCount('POST');

  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db('hackhunt');

    await db.collection('hackathon_overviews').insertOne(body);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Failed to create overview:', err);
    return NextResponse.json({ success: false, message: 'Failed to save overview' }, { status: 500 });
  }
}
