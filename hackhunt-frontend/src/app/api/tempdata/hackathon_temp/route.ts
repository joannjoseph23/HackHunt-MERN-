// src/app/api/tempdata/hackathon_temp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb';


export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('hackhunt');
    const data = await db.collection('hackathons_temp').find({}).toArray();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching hackathon_temp:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
