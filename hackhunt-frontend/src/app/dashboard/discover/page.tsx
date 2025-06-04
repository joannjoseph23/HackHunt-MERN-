'use client';
import HackathonCard from '@/components/HackathonCard';
import { useEffect, useState } from 'react';

type Hackathon = {
  _id: string;
  name: string;
  date: string;
  image: string;
};

export default function DiscoverPage() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);

  useEffect(() => {
    fetch('/api/hackathons')
      .then(res => res.json())
      .then(data => setHackathons(data));
  }, []);

  return (
    <main style={styles.main}>
      <h1 style={styles.header}>Explore Hackathons</h1>
      <div style={styles.grid}>
        {hackathons.map(h => (
          <HackathonCard
            key={h._id}
            id={h._id}
            name={h.name}
            date={h.date}
            image={h.image}
          />
        ))}
      </div>
    </main>
  );
}

const styles = {
  main: {
    backgroundColor: '#0D1B2A',
    color: '#7EC8E3',
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: `'Cinzel Decorative', serif`,
  },
  header: {
    fontSize: '2rem',
    textAlign: 'center' as const,
    marginBottom: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
};
