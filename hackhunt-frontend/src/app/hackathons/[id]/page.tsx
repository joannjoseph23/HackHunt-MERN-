'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HackathonDetail() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetch(`/api/hackathon/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  if (!data) return <p style={{ color: '#7EC8E3', textAlign: 'center' }}>Loading...</p>;

  const tabStyle = (tab: string) => ({
    padding: '1rem',
    borderBottom: activeTab === tab ? '2px solid #7EC8E3' : 'none',
    cursor: 'pointer',
    color: '#7EC8E3',
    fontWeight: 600,
  });

  return (
    <main style={{ backgroundColor: '#0D1B2A', color: '#7EC8E3', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>{data.base.name}</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '2rem 0' }}>
        {['overview', 'prizes', 'speakers', 'schedule'].map(tab => (
          <div key={tab} style={tabStyle(tab)} onClick={() => setActiveTab(tab)}>
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {activeTab === 'overview' && (
          <div>
            <img src={data.overview?.image} style={{ width: '100%', borderRadius: 10 }} alt="Hackathon banner" />
            <p><strong>Runs From:</strong> {data.overview?.runsFrom}</p>
            <p><strong>Mode:</strong> {data.overview?.happening}</p>
            <p><strong>Twitter:</strong> <a href={data.overview?.twitter}>{data.overview?.twitter}</a></p>
            <p><strong>Discord:</strong> <a href={data.overview?.discord}>{data.overview?.discord}</a></p>
          </div>
        )}

        {activeTab === 'prizes' && (
          <div>
            <p><strong>Organizer:</strong> {data.prizes?.organizer}</p>
            <p><strong>Prize Pool:</strong> {data.prizes?.prizePool}</p>
          </div>
        )}

        {activeTab === 'speakers' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {data.speakers.map((s: any, index: number) => (
              <div key={s._id?.$oid || s.link || index} style={{
                border: '1px solid #7EC8E3',
                borderRadius: 8,
                padding: '1rem',
                width: '200px',
                textAlign: 'center'
              }}>
                <img src={s.image} alt={s.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 8 }} />
                <p style={{ margin: '0.5rem 0', fontWeight: 600 }}>{s.name}</p>
                <p>{s.title}</p>
                <a href={s.link} style={{ color: '#7EC8E3' }}>View Profile</a>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'schedule' && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {data.schedule.map((e: any, index: number) => (
              <li key={e._id?.$oid || `${e.date}-${e.time}` || index} style={{ marginBottom: '1rem' }}>
                <strong>{e.date} - {e.time}</strong>: {e.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
