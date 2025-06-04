'use client';
import { useRouter } from 'next/navigation';

export default function OrganizeHackathonIntro() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/dashboard/build/create'); // <-- Adjust this to match your actual create form route
  };

  return (
    <main style={{ backgroundColor: '#0D1B2A', color: '#7EC8E3', minHeight: '100vh', padding: '3rem' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem' }}>
        Organize a Hackathon
      </h1>

      <section style={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
        <p style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>
          Are you ready to create a hackathon? Let your creativity and inspiration guide you as you build a space for innovation, collaboration, and impact.
        </p>

        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Community Guidelines</h2>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
          <li>✅ Be inclusive – all skill levels, backgrounds, and ideas are welcome.</li>
          <li>✅ Foster a safe, respectful, and collaborative environment.</li>
          <li>✅ Set clear rules, judging criteria, and timelines for participants.</li>
          <li>✅ Encourage creativity, experimentation, and teamwork.</li>
          <li>✅ Communicate proactively via Discord, email, and social media.</li>
        </ul>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleStart}
            style={{
              backgroundColor: '#7EC8E3',
              color: '#0D1B2A',
              border: 'none',
              padding: '0.75rem 2rem',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Let’s Get Started
          </button>
        </div>
      </section>
    </main>
  );
}
