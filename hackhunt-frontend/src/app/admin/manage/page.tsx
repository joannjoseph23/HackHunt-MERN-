'use client';
import HackathonCard from '@/components/HackathonCard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logToSentry } from '../../../../utils/sentryLogger';

type Hackathon = {
  _id: string;
  name: string;
  date: string;
  image: string;
  url: string;
};

export default function ManagePage() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/hackathons')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch hackathons');
        return res.json();
      })
      .then(data => setHackathons(data))
      .catch(err => {
        logToSentry('Failed to fetch hackathons', 'error', {
          error: err.message,
        });
      });
  }, []);

  const handleDelete = async (url: string) => {
    if (!confirm('Are you sure you want to delete this hackathon?')) return;

    try {
      logToSentry('Admin initiated hackathon delete', 'info', { hackathonUrl: url });

      await Promise.all([
        fetch(`/api/admin/delete/hackathons?url=${url}`, { method: 'DELETE' }),
        fetch(`/api/admin/delete/overviews?url=${url}`, { method: 'DELETE' }),
        fetch(`/api/admin/delete/prizes?url=${url}`, { method: 'DELETE' }),
        fetch(`/api/admin/delete/speakers?url=${url}`, { method: 'DELETE' }),
        fetch(`/api/admin/delete/scheduless?url=${url}`, { method: 'DELETE' }),
      ]);

      setHackathons(prev => prev.filter(h => h.url !== url));

      logToSentry('Hackathon deleted successfully', 'info', { hackathonUrl: url });
      alert('Hackathon deleted.');
    } catch (err) {
      console.error(err);
      logToSentry('Error deleting hackathon', 'error', {
        hackathonUrl: url,
        error: (err as Error).message,
      });
      alert('Error deleting hackathon.');
    }
  };

  return (
    <main style={{ backgroundColor: '#0D1B2A', minHeight: '100vh', padding: '2rem', color: '#7EC8E3' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Manage Hackathons</h1>
        <button
          onClick={() => router.push('/dashboard/build/create')}
          style={{
            backgroundColor: '#7EC8E3',
            color: '#0D1B2A',
            border: 'none',
            padding: '0.6rem 1.5rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            borderRadius: '5px',
          }}
        >
          ➕ Create New Hackathon
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem',
        justifyContent: 'center'
      }}>
        {hackathons.map(h => (
          <div key={h._id} style={{ position: 'relative' }}>
            <HackathonCard id={h._id} name={h.name} date={h.date} image={h.image} />

            <div style={{
              position: 'absolute',
              top: 10,
              right: 10,
              display: 'flex',
              gap: '0.5rem',
            }}>
              <button
                title="Edit"
                onClick={() => router.push(`/admin/manage/${encodeURIComponent(h._id)}`)}
                style={{
                  backgroundColor: '#7EC8E3',
                  border: 'none',
                  padding: '0.3rem 0.6rem',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >✏️</button>
              <button
                title="Delete"
                onClick={() => handleDelete(h.url)}
                style={{
                  backgroundColor: '#c0392b',
                  color: '#fff',
                  border: 'none',
                  padding: '0.3rem 0.6rem',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
