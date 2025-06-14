// Mock NextResponse.json to behave like a real response
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body) => ({
      status: 200,
      json: async () => body,
    })),
  },
}));

import { NextRequest } from 'next/server';
import { POST } from '../app/api/hackathons/route';

const mockInsertOne = jest.fn().mockResolvedValue({ insertedId: '123abc' });

jest.mock('../../lib/mongodb', () => ({
  __esModule: true,
  default: Promise.resolve({
    db: () => ({
      collection: () => ({
        insertOne: mockInsertOne,
      }),
    }),
  }),
}));

describe('POST /api/hackathons', () => {
  it('should insert a hackathon and return success', async () => {
    const mockReq = {
      json: async () => ({ name: 'Sample Hackathon' }),
    } as unknown as NextRequest;

    const res = await POST(mockReq);
    const json = await res.json();

    expect(mockInsertOne).toHaveBeenCalledWith({ name: 'Sample Hackathon' });
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });
});
