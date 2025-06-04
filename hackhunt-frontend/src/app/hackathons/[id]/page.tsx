'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HackathonDetail() {
  const { id } = useParams() as { id: string };
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    expertise: '',
    isTeam: undefined as undefined | boolean,
    teamSize: 0,
    teamMembers: [] as { name: string; email: string; phone: string }[],
    links: '',
    question: '',
  });

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      experience: '',
      expertise: '',
      isTeam: undefined,
      teamSize: 0,
      teamMembers: [],
      links: '',
      question: '',
    });
  };

  useEffect(() => {
    fetch(`/api/hackathon/${id}`)
      .then((res) => res.json())
      .then(setData);
  }, [id]);

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        body: JSON.stringify({
          hackathonId: data.base._id,
          hackathonName: data.base.name,
          ...formData,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        alert('Applied successfully!');
        clearForm();
        setShowForm(false);
      } else {
        const error = await res.json();
        alert(`Submission failed: ${error.message}`);
      }
    } catch (err) {
      alert('An error occurred during submission.');
      console.error(err);
    }
  };

  const tabStyle = (tab: string) => ({
    padding: '1rem',
    borderBottom: activeTab === tab ? '2px solid #7EC8E3' : 'none',
    cursor: 'pointer',
    color: '#7EC8E3',
    fontWeight: 600,
  });

  const Countdown = ({ targetDate }: { targetDate: Date }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        const diff = +targetDate - +new Date();
        if (diff <= 0) {
          setTimeLeft('Closed');
          clearInterval(interval);
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${days}d ${hours}h ${mins}m ${secs}s`);
      }, 1000);
      return () => clearInterval(interval);
    }, [targetDate]);

    return <p style={{ fontSize: '1.2rem' }}>{timeLeft}</p>;
  };

  if (!data) {
    return <p style={{ color: '#7EC8E3', textAlign: 'center' }}>Loading...</p>;
  }

const runsFrom = data.overview?.runsFrom;
let endDate = new Date();
if (runsFrom) {
  const parts = runsFrom.split('-');
  const startMonthDay = parts[0].trim(); // "Jul 11"
  const endDayYear = parts[1].trim();    // "13, 2025"

  const month = startMonthDay.split(' ')[0];  // "Jul"
  const year = endDayYear.split(',')[1]?.trim(); // "2025"
  const endDay = endDayYear.split(',')[0].trim(); // "13"

  if (month && endDay && year) {
    endDate = new Date(`${month} ${endDay}, ${year}`);
  }
}
  const tabs = ['overview', 'prizes', ...(data.speakers?.length ? ['speakers'] : []), 'schedule'];

  const inputStyle = {
    marginBottom: '1rem',
    padding: '0.5rem',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #7EC8E3',
    backgroundColor: '#0D1B2A',
    color: '#7EC8E3',
  };

  return (
    <main style={{ backgroundColor: '#0D1B2A', color: '#7EC8E3', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>{data.base?.name}</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '2rem 0' }}>
        {tabs.map((tab) => (
          <div key={tab} style={tabStyle(tab)} onClick={() => setActiveTab(tab)}>
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {activeTab === 'overview' && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={data.overview?.image}
              alt="Hackathon banner"
              style={{ width: '70%', maxWidth: '800px', borderRadius: 10, margin: '0 auto', display: 'block' }}
            />
            <div
              style={{
                marginTop: '2rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: '10px',
                maxWidth: '800px',
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: 1.8,
                textAlign: 'left',
              }}
            >
              <p><strong>Runs From:</strong> {data.overview?.runsFrom}</p>
              <p><strong>Happening:</strong> {data.overview?.happening}</p>
              <p><strong>Twitter:</strong> <a href={data.overview?.twitter} target="_blank" style={{ color: '#7EC8E3' }}>{data.overview?.twitter}</a></p>
              <p><strong>Discord:</strong> <a href={data.overview?.discord} target="_blank" style={{ color: '#7EC8E3' }}>{data.overview?.discord}</a></p>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Time left to apply:</h3>
              <Countdown targetDate={endDate} />
              <button
                onClick={() => setShowForm(true)}
                style={{
                  marginTop: '1.5rem',
                  backgroundColor: 'transparent',
                  border: '2px solid #7EC8E3',
                  color: '#7EC8E3',
                  padding: '0.7rem 2rem',
                  cursor: 'pointer',
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: '1rem',
                }}
              >
                Apply Now
              </button>
            </div>
          </div>
        )}

        {showForm && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 99, padding: '2rem', overflowY: 'auto'
          }}>
            <div style={{
              background: '#0D1B2A',
              padding: '2rem',
              borderRadius: '12px',
              color: '#7EC8E3',
              minWidth: '350px',
              maxWidth: '700px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <h2>Apply for {data.base.name}</h2>

              <input placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={inputStyle} />
              <input placeholder="Your Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
              <input placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={inputStyle} />
              <input placeholder="Experience Level" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} style={inputStyle} />
              <input placeholder="Expertise" value={formData.expertise} onChange={e => setFormData({ ...formData, expertise: e.target.value })} style={inputStyle} />

              <select
                value={formData.isTeam === undefined ? '' : formData.isTeam ? 'yes' : 'no'}
                onChange={(e) => setFormData({ ...formData, isTeam: e.target.value === 'yes' })}
                style={inputStyle}
              >
                <option value="" disabled>Are you applying as a team?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              {formData.isTeam && (
                <>
                  <input
                    type="number"
                    min={1}
                    placeholder="Team size"
                    value={formData.teamSize}
                    onChange={(e) => {
                      const size = parseInt(e.target.value) || 0;
                      setFormData(prev => ({
                        ...prev,
                        teamSize: size,
                        teamMembers: Array.from({ length: size }, (_, i) => prev.teamMembers[i] || { name: '', email: '', phone: '' }),
                      }));
                    }}
                    style={inputStyle}
                  />

                  {formData.teamMembers.map((member, idx) => (
                    <div key={idx} style={{ marginBottom: '1rem' }}>
                      <p style={{ fontWeight: 'bold' }}>Member {idx + 1}</p>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <input
                          placeholder="Name"
                          value={member.name}
                          onChange={(e) => {
                            const updated = [...formData.teamMembers];
                            updated[idx].name = e.target.value;
                            setFormData({ ...formData, teamMembers: updated });
                          }}
                          style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
                        />
                        <input
                          placeholder="Email"
                          value={member.email}
                          onChange={(e) => {
                            const updated = [...formData.teamMembers];
                            updated[idx].email = e.target.value;
                            setFormData({ ...formData, teamMembers: updated });
                          }}
                          style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
                        />
                        <input
                          placeholder="Phone"
                          value={member.phone}
                          onChange={(e) => {
                            const updated = [...formData.teamMembers];
                            updated[idx].phone = e.target.value;
                            setFormData({ ...formData, teamMembers: updated });
                          }}
                          style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}

              <input placeholder="Links (GitHub/LinkedIn)" value={formData.links} onChange={e => setFormData({ ...formData, links: e.target.value })} style={inputStyle} />
              <textarea placeholder="Any questions for the organizers?" value={formData.question} onChange={e => setFormData({ ...formData, question: e.target.value })} style={{ ...inputStyle, height: '70px' }} />

              <div style={{ marginTop: '1rem' }}>
                <button onClick={handleSubmit} style={{ backgroundColor: '#7EC8E3', color: '#0D1B2A', border: 'none', padding: '0.7rem 1.5rem', cursor: 'pointer', fontWeight: 'bold' }}>Submit</button>
                <button onClick={() => { clearForm(); setShowForm(false); }} style={{ marginLeft: '1rem', background: 'transparent', color: '#7EC8E3', border: '1px solid #7EC8E3', padding: '0.5rem 1rem', cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* PRIZES TAB */}
        {activeTab === 'prizes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
            <div style={{
              backgroundImage: "url('/images/download.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '2rem',
              borderRadius: '12px',
              width: '90%',
              maxWidth: '800px',
              color: '#7EC8E3',
              position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(13, 27, 42, 0.6)', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3>Organizer</h3>
                <p>{data.prizes?.organizer}</p>
              </div>
            </div>

            <div style={{
              backgroundImage: "url('/images/download 1.jpeg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '2rem',
              borderRadius: '12px',
              width: '90%',
              maxWidth: '800px',
              color: '#7EC8E3',
              position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(13, 27, 42, 0.6)', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3>Prize Pool</h3>
                <p>{data.prizes?.prizePool}</p>
              </div>
            </div>
          </div>
        )}

        {/* SPEAKERS */}
        {activeTab === 'speakers' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
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

        {/* SCHEDULE */}
        {activeTab === 'schedule' && (
          <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {data.schedule.map((e: any, index: number) => (
              <div key={`${e.date}-${e.time}-${index}`} style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: '12px',
                color: '#7EC8E3',
                fontFamily: "'Cinzel Decorative', serif",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}>
                  {e.date}
                </div>
                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 500 }}>{e.time}</div>
                  <div style={{ fontSize: '1.1rem' }}>{e.title}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
