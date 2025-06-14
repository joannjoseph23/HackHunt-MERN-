// @ts-nocheck
// src/app/api/hackathon/[id]/route.ts

import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb';

export async function GET(

  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    const client = await clientPromise;
    const db = client.db('hackhunt');

    const base = await db.collection('hackathons').findOne({ _id: new ObjectId(id) });
    if (!base) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const { url } = base;

    const [overview, prizes, speakers, schedule] = await Promise.all([
      db.collection('hackathonoverviews').findOne({ url }),
      db.collection('hackathonprizes').findOne({ url }),
      db.collection('hackathonspeakers').findOne({ url }),
      db.collection('hackathonschedules').findOne({ url }),
    ]);

    return NextResponse.json({
      base,
      overview,
      prizes,
      speakers: speakers?.speakers || [],
      schedule: schedule?.schedule || [],
    });
  } catch (err) {
    console.error('❌ API Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
