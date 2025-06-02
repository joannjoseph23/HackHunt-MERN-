import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import clientPromise from '../../../../../lib/mongodb';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Get the hackathon's name & url from `hackathons` collection using ID
    const base = await db.collection('hackathons').findOne({ _id: new ObjectId(params.id) });
    if (!base) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const { name, url } = base;

    // Now fetch from the 3 other collections by matching name or url
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
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
