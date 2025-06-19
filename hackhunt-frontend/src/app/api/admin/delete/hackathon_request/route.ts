import { incrementRequestCount } from '@/lib/metrics';
import { NextResponse } from 'next/server';
import clientPromise from '../../../../../../lib/mongodb'; // Adjust path as needed

export async function DELETE(req: Request) {
  incrementRequestCount('DELETE');

  const url = new URL(req.url).searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db('hackhunt');

  const collections = [
    'hackathon_temp',
    'hackathon_overviews',
    'hackathon_prizes',
    'hackathon_speakers',
    'hackathon_schedules',
  ];

  const deleteResults = await Promise.all(
    collections.map((col) => db.collection(col).deleteOne({ url }))
  );

  return NextResponse.json({
    success: true,
    deleted: collections.reduce((acc, col, i) => {
      acc[col] = deleteResults[i].deletedCount;
      return acc;
    }, {} as Record<string, number>),
  });
}
