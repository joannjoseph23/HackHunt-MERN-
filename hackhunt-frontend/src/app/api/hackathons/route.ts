// hackhunt-frontend/src/app/api/hackathons/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('hackhunt');
    const data = await db.collection('hackathons').find().toArray();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hackathons' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db('hackhunt');
    await db.collection('hackathons').insertOne(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Failed to insert hackathon:', error);
    return NextResponse.json({ error: 'Failed to insert hackathon' }, { status: 500 });
  }
}
