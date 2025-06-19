'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logToSentry } from '../../../../utils/sentryLogger';

export default function AdminNotifications() {
  const [pendingList, setPendingList] = useState<any[]>([]);
  const [activeHackathon, setActiveHackathon] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/tempdata/hackathon_temp')
      .then((res) => res.json())
      .then((data) => setPendingList(data))
      .catch((err) => {
        logToSentry('Failed to fetch pending hackathon list', 'error', {
          error: err.message,
        });
      });
  }, []);

  const handleDetailsClick = async (hackathon: any) => {
    const encodedUrl = encodeURIComponent(hackathon.url);
    try {
      const [overview, prizes, speakersData, scheduleData] = await Promise.all([
        fetch(`/api/tempdata/hackathon_overviews/${encodedUrl}`).then((res) => res.json()),
        fetch(`/api/tempdata/hackathon_prizes/${encodedUrl}`).then((res) => res.json()),
        fetch(`/api/tempdata/hackathon_speakers/${encodedUrl}`).then((res) => res.json()),
        fetch(`/api/tempdata/hackathon_schedules/${encodedUrl}`).then((res) => res.json()),
      ]);

      const speakers = Array.isArray(speakersData?.speakers) ? speakersData.speakers : [];
      const schedule = Array.isArray(scheduleData?.schedule) ? scheduleData.schedule : [];

      setActiveHackathon({
        base: hackathon,
        overview,
        prizes,
        speakers,
        schedule,
      });
    } catch (err) {
      logToSentry('Failed to fetch hackathon details', 'error', {
        hackathonUrl: hackathon.url,
        error: (err as Error).message,
      });
    }
  };

  const handleAccept = async () => {
    if (!activeHackathon) return;

    const { base, overview, prizes, speakers, schedule } = activeHackathon;
    const encodedUrl = encodeURIComponent(base.url);

    try {
      await Promise.all([
        fetch('/api/hackathons', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(base),
        }),
        fetch('/api/hackathonoverviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(overview),
        }),
        fetch('/api/hackathonprizes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prizes),
        }),
        fetch('/api/hackathonspeakers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: base.name, url: base.url, speakers }),
        }),
        fetch('/api/hackathonschedules', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: base.name, url: base.url, schedule }),
        }),
      ]);

      await Promise.all([
        fetch(`/api/tempdata/hackathon_temp/${encodedUrl}`, { method: 'DELETE' }),
        fetch(`/api/tempdata/hackathon_overviews/${encodedUrl}`, { method: 'DELETE' }),
        fetch(`/api/tempdata/hackathon_prizes/${encodedUrl}`, { method: 'DELETE' }),
        fetch(`/api/tempdata/hackathon_speakers/${encodedUrl}`, { method: 'DELETE' }),
        fetch(`/api/tempdata/hackathon_schedules/${encodedUrl}`, { method: 'DELETE' }),
      ]);

      logToSentry('Hackathon accepted by admin', 'info', { hackathonUrl: base.url });

      alert('Hackathon Accepted ✅');
      setPendingList((prev) => prev.filter((h) => h.url !== base.url));
      setActiveHackathon(null);
    } catch (err) {
      console.error('Error accepting hackathon:', err);
      logToSentry('Error accepting hackathon', 'error', {
        hackathonUrl: base.url,
        error: (err as Error).message,
      });
      alert('Failed to accept hackathon ❌');
    }
  };

const handleReject = async () => {
  if (!activeHackathon) return;

  const encodedUrl = encodeURIComponent(activeHackathon.base.url);

  try {
    await fetch(`/api/admin/delete/hackathon_request?url=${encodedUrl}`, {
      method: 'DELETE',
    });

    logToSentry('Hackathon rejected by admin', 'info', {
      hackathonUrl: activeHackathon.base.url,
    });

    alert('Hackathon Rejected ❌');
    setPendingList((prev) => prev.filter((h) => h.url !== activeHackathon.base.url));
    setActiveHackathon(null);
  } catch (err) {
    console.error('Error rejecting hackathon:', err);
    logToSentry('Error rejecting hackathon', 'error', {
      hackathonUrl: activeHackathon.base.url,
      error: (err as Error).message,
    });
    alert('Failed to reject hackathon ❌');
  }
};


  if (activeHackathon) {
    const tabs = ['overview', 'prizes', ...(activeHackathon.speakers?.length ? ['speakers'] : []), 'schedule'];

    return (
      <main style={{ backgroundColor: '#0D1B2A', color: '#7EC8E3', minHeight: '100vh', padding: '2rem' }}>
        <h1 style={{ textAlign: 'center' }}>{activeHackathon.base?.name}</h1>

        <img
          src={activeHackathon.base?.image}
          alt="Hackathon"
          style={{
            width: '100%',
            maxWidth: '600px',
            margin: '2rem auto',
            display: 'block',
            borderRadius: '12px',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', margin: '2rem 0' }}>
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                backgroundColor: activeTab === tab ? '#1B263B' : 'transparent',
                border: `1px solid ${activeTab === tab ? '#7EC8E3' : '#415A77'}`,
                transition: 'all 0.3s ease',
                fontWeight: 'bold',
              }}
            >
              {tab.toUpperCase()}
            </div>
          ))}
        </div>

        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            backgroundColor: '#1B263B',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          {activeTab === 'overview' && (
            <div>
              <p><strong>Runs From:</strong> {activeHackathon.overview.runsFrom}</p>
              <p><strong>Happening:</strong> {activeHackathon.overview.happening}</p>
              <p><strong>Twitter:</strong> <a href={activeHackathon.overview.twitter}>{activeHackathon.overview.twitter}</a></p>
              <p><strong>Discord:</strong> <a href={activeHackathon.overview.discord}>{activeHackathon.overview.discord}</a></p>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button
                  onClick={handleAccept}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#7EC8E3',
                    color: '#0D1B2A',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  ✅ Accept Hackathon
                </button>

                <button
                  onClick={handleReject}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#E74C3C',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  ❌ Reject Hackathon
                </button>
              </div>
            </div>
          )}

          {activeTab === 'prizes' && (
            <div>
              <p><strong>Organizer:</strong> {activeHackathon.prizes.organizer}</p>
              <p><strong>Prize Pool:</strong> {activeHackathon.prizes.prizePool}</p>
            </div>
          )}

          {activeTab === 'speakers' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
              {activeHackathon.speakers.map((s: any, i: number) => (
                <div
                  key={i}
                  style={{
                    border: '1px solid #7EC8E3',
                    borderRadius: 8,
                    padding: '1rem',
                    width: '220px',
                    textAlign: 'center',
                    backgroundColor: '#0D1B2A',
                  }}
                >
                  <img
                    src={s.image}
                    alt={s.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 8 }}
                  />
                  <p style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>{s.name}</p>
                  <p>{s.title}</p>
                  <a href={s.link} target="_blank" style={{ color: '#7EC8E3' }}>
                    View Profile
                  </a>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'schedule' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activeHackathon.schedule.map((e: any, i: number) => (
                <div
                  key={i}
                  style={{
                    border: '1px solid #7EC8E3',
                    borderRadius: '10px',
                    padding: '1rem',
                    backgroundColor: '#0D1B2A',
                  }}
                >
                  <p><strong>Date:</strong> {e.date}</p>
                  <p><strong>Time:</strong> {e.time}</p>
                  <p><strong>Title:</strong> {e.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: '#0D1B2A', color: '#7EC8E3', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Admin Notifications</h1>
      {pendingList.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>No pending hackathons.</p>
      ) : (
        <ul style={{ maxWidth: '600px', margin: '2rem auto', listStyle: 'none', padding: 0 }}>
          {pendingList.map((hackathon) => (
            <li
              key={hackathon.url}
              style={{
                border: '1px solid #7EC8E3',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '12px',
              }}
            >
              <img
                src={hackathon.image || '/default-image.jpg'}
                alt={`${hackathon.name} logo`}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                }}
              />
              <h3>{hackathon.name}</h3>
              <button
                onClick={() => handleDetailsClick(hackathon)}
                style={{ marginTop: '0.5rem', cursor: 'pointer' }}
              >
                More Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
