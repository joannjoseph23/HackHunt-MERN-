import { incrementRequestCount } from '@/lib/metrics';
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

export async function POST(req: NextRequest) {
  incrementRequestCount('POST');

  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();

    await db.collection('hackathonspeakers').insertOne(body);
    return NextResponse.json({ message: 'Hackathon speaker added successfully.' });
  } catch (err) {
    console.error('Error adding speaker:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
