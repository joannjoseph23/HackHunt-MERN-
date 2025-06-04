import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb'; // Adjust path as needed

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      hackathonId,
      hackathonName,
      name,
      email,
      phone,
      experience,
      expertise,
      isTeam,
      teamSize,
      teamMembers,
      links,
      question
    } = body;

    const client = await clientPromise;
    const db = client.db('hackhunt'); // Your DB name

    // Structure the registration data
    const registration = {
      hackathonId: new ObjectId(hackathonId),
      hackathonName,
      applicant: {
        name,
        email,
        phone,
        experience,
        expertise,
        links,
        question
      },
      isTeam,
      teamSize,
      teamMembers: isTeam ? teamMembers : [],
      submittedAt: new Date()
    };

    // Store in a "registrations" collection
    await db.collection('registrations').insertOne(registration);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Registration error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
