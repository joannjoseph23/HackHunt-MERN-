import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();

    await db.collection('hackathonoverviews').insertOne(body);
    return NextResponse.json({ message: 'Hackathon overview added successfully.' });
  } catch (err) {
    console.error('Error adding overview:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
