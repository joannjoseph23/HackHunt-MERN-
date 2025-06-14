import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../../../../lib/mongodb'; // Adjust path as needed

export async function DELETE(_: NextRequest, { params }: { params: { url: string } }) {
  const url = decodeURIComponent(params.url);
  const client = await clientPromise;
  const db = client.db('hackhunt');

  const result = await db.collection('hackathons_temp').deleteOne({ url });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
