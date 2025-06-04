import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db('hackhunt');

    await db.collection('hackathon_prizes').insertOne(body);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Failed to create prizes:', err);
    return NextResponse.json({ success: false, message: 'Failed to save prizes' }, { status: 500 });
  }
}
