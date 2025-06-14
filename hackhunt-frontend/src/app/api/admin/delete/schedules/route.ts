import { NextResponse } from 'next/server';
import clientPromise from '../../../../../../lib/mongodb'; // Adjust path as needed
import { incrementRequestCount } from '@/lib/metrics';

export async function DELETE(req: Request) {
  incrementRequestCount('DELETE');

  const url = new URL(req.url).searchParams.get('url');
  const client = await clientPromise;
  const db = client.db('hackhunt');
  await db.collection('hackathonschedules').deleteOne({ url });
  return NextResponse.json({ success: true });
}
