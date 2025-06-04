// src/app/api/tempdata/hackathon_temp/[url]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../../../lib/mongodb';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { url: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('hackhunt');
    const decodedUrl = decodeURIComponent(params.url);

    const result = await db.collection('hackathons_temp').deleteOne({ url: decodedUrl });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Not found to delete' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Error deleting from hackathon_temp:', err);
    return NextResponse.json({ message: 'Failed to delete' }, { status: 500 });
  }
}
