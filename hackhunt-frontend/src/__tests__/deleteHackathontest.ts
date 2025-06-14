jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body) => ({
      status: 200,
      json: async () => body,
    })),
  },
}));

import { DELETE } from '../app/api/admin/delete/hackathons/route';

jest.mock('../../lib/mongodb', () => ({
  __esModule: true,
  default: Promise.resolve({
    db: () => ({
      collection: () => ({
        deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      }),
    }),
  }),
}));

describe('DELETE /api/admin/delete/hackathons', () => {
  it('deletes hackathon by URL and returns success', async () => {
    const url = 'https://example.com';
    const req = {
      url: `http://localhost/api/admin/delete/hackathons?url=${encodeURIComponent(url)}`
    } as unknown as Request;

    const res = await DELETE(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });
});
