'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logToSentry } from '../../../../../utils/sentryLogger';

export default function EditHackathonPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/hackathon/${id}`)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (section: string, key: string, value: string) => {
    setData((prev: any) => {
      const updated = { ...prev };
      if (section === 'base') updated.base[key] = value;
      else if (section === 'overview') updated.overview[key] = value;
      else if (section === 'prizes') updated.prizes[key] = value;
      return updated;
    });
  };

  const saveChanges = async () => {
    try {
      const { base, overview, prizes } = data;

      await Promise.all([
        fetch('/api/admin/update/hackathons', {
          method: 'PUT',
          body: JSON.stringify(base),
          headers: { 'Content-Type': 'application/json' },
        }),
        fetch('/api/admin/update/overviews', {
          method: 'PUT',
          body: JSON.stringify(overview),
          headers: { 'Content-Type': 'application/json' },
        }),
        fetch('/api/admin/update/prizes', {
          method: 'PUT',
          body: JSON.stringify(prizes),
          headers: { 'Content-Type': 'application/json' },
        }),
      ]);

      alert('Changes saved successfully!');
      router.push('/admin/manage');
    } catch (err) {
  console.error(err);
  logToSentry('Failed to save hackathon changes', 'error', {
    hackathonId: id,
    error: (err as Error).message,
  });
  alert('Failed to save changes');
}
  };

  if (loading) return <p style={{ color: '#7EC8E3' }}>Loading...</p>;
  if (!data) return <p style={{ color: 'red' }}>Hackathon not found</p>;

  const tabStyle = (tab: string) => ({
    padding: '1rem',
    borderBottom: activeTab === tab ? '2px solid #7EC8E3' : 'none',
    cursor: 'pointer',
    color: '#7EC8E3',
    fontWeight: 600,
  });

  return (
    <main style={{ backgroundColor: '#0D1B2A', color: '#7EC8E3', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Edit Hackathon: {data.base.name}</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '2rem 0' }}>
        {['overview', 'prizes', 'base'].map(tab => (
          <div key={tab} style={tabStyle(tab)} onClick={() => setActiveTab(tab)}>
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {activeTab === 'overview' && (
          <>
            <label>Image URL</label>
            <input value={data.overview.image} onChange={e => handleChange('overview', 'image', e.target.value)} style={inputStyle} />
            <label>Runs From</label>
            <input value={data.overview.runsFrom} onChange={e => handleChange('overview', 'runsFrom', e.target.value)} style={inputStyle} />
            <label>Discord</label>
            <input value={data.overview.discord} onChange={e => handleChange('overview', 'discord', e.target.value)} style={inputStyle} />
            <label>Twitter</label>
            <input value={data.overview.twitter} onChange={e => handleChange('overview', 'twitter', e.target.value)} style={inputStyle} />
            <label>Happening</label>
            <input value={data.overview.happening} onChange={e => handleChange('overview', 'happening', e.target.value)} style={inputStyle} />
          </>
        )}

        {activeTab === 'prizes' && (
          <>
            <label>Organizer</label>
            <input value={data.prizes.organizer} onChange={e => handleChange('prizes', 'organizer', e.target.value)} style={inputStyle} />
            <label>Prize Pool</label>
            <input value={data.prizes.prizePool} onChange={e => handleChange('prizes', 'prizePool', e.target.value)} style={inputStyle} />
          </>
        )}

        {activeTab === 'base' && (
          <>
            <label>Name</label>
            <input value={data.base.name} onChange={e => handleChange('base', 'name', e.target.value)} style={inputStyle} />
            <label>Date</label>
            <input value={data.base.date} onChange={e => handleChange('base', 'date', e.target.value)} style={inputStyle} />
            <label>Image</label>
            <input value={data.base.image} onChange={e => handleChange('base', 'image', e.target.value)} style={inputStyle} />
          </>
        )}

        {activeTab === 'overview' && (
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button
              onClick={saveChanges}
              style={{
                backgroundColor: '#7EC8E3',
                color: '#0D1B2A',
                border: 'none',
                padding: '0.8rem 2.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1.1rem',
                borderRadius: '6px',
              }}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

const inputStyle = {
  marginBottom: '1rem',
  padding: '0.5rem',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #7EC8E3',
  backgroundColor: '#0D1B2A',
  color: '#7EC8E3',
};
