import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../../../lib/mongodb'; // Adjust path as needed

export async function PUT(req: NextRequest) {
  try {
    const updated = await req.json();

    // ✅ Extract _id and safely remove it from the update object
    const { _id, ...rest } = updated;

    const client = await clientPromise;
    const db = client.db();

    // ✅ Use ObjectId for querying by _id
    await db.collection('hackathonoverviews').updateOne(
      { _id: new ObjectId(_id) },
      { $set: rest }
    );

    return NextResponse.json({ message: 'Hackathon overview info updated successfully' });
  } catch (err) {
    console.error('❌ Update hackathon error:', err);
    return NextResponse.json({ message: 'Failed to update hackathon overview' }, { status: 500 });
  }
}
