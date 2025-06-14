import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import { incrementRequestCount } from '@/lib/metrics';

export async function POST(req: NextRequest) {
  incrementRequestCount('POST');

  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();

    await db.collection('hackathonprizes').insertOne(body);
    return NextResponse.json({ message: 'Hackathon prizes added successfully.' });
  } catch (err) {
    console.error('Error adding prize:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
