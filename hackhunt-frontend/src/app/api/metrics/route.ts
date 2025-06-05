import { getMetrics } from '@/lib/metrics';
import { NextResponse } from 'next/server';

export function GET() {
  const metrics = getMetrics();
  return new NextResponse(metrics, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}
