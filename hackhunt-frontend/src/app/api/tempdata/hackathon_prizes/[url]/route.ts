import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../../../lib/mongodb';

export async function GET(
  req: NextRequest,
  { params }: { params: { url: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const decodedUrl = decodeURIComponent(params.url); // Important: decode!
    const data = await db.collection('hackathon_prizes').findOne({ url: decodedUrl });

    if (!data) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { url: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const decodedUrl = decodeURIComponent(params.url);

    const result = await db.collection('hackathon_prizes').deleteOne({ url: decodedUrl });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Not found to delete' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err) {
    return NextResponse.json({ message: 'Failed to delete' }, { status: 500 });
  }
}