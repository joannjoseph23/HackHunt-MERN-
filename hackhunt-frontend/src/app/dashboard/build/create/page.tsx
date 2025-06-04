'use client';
import { useState } from 'react';

type Speaker = {
  name: string;
  title: string;
  image: string;
  link: string;
};

type ScheduleEntry = {
  date: string;
  time: string;
  title: string;
};

export default function CreateHackathon() {
  const [form, setForm] = useState({
    name: '',
    url: '',
    image: '',
    runsFrom: '',
    discord: '',
    twitter: '',
    happening: '',
    organizer: '',
    prizePool: '',
  });

  const [speakers, setSpeakers] = useState<Speaker[]>([
    { name: '', title: '', image: '', link: '' }
  ]);

  const [schedule, setSchedule] = useState<ScheduleEntry[]>([
    { date: '', time: '', title: '' }
  ]);

  const resetForm = () => {
    setForm({
      name: '',
      url: '',
      image: '',
      runsFrom: '',
      discord: '',
      twitter: '',
      happening: '',
      organizer: '',
      prizePool: '',
    });
    setSpeakers([{ name: '', title: '', image: '', link: '' }]);
    setSchedule([{ date: '', time: '', title: '' }]);
  };

  const handleFormChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };
const tempSummary = {
  name: form.name,
  runsFrom: form.runsFrom,
  image: form.image,
  url: form.url,
};
  const handleSpeakerChange = (i: number, key: keyof Speaker, value: string) => {
    const updated = [...speakers];
    updated[i] = { ...updated[i], [key]: value };
    setSpeakers(updated);
  };

  const handleScheduleChange = (i: number, key: keyof ScheduleEntry, value: string) => {
    const updated = [...schedule];
    updated[i] = { ...updated[i], [key]: value };
    setSchedule(updated);
  };

  const addSpeaker = () => {
    setSpeakers([...speakers, { name: '', title: '', image: '', link: '' }]);
  };

  const addSchedule = () => {
    setSchedule([...schedule, { date: '', time: '', title: '' }]);
  };

  const handleSubmit = async () => {
    try {
      const overview = {
        name: form.name,
        url: form.url,
        image: form.image,
        runsFrom: form.runsFrom,
        discord: form.discord,
        twitter: form.twitter,
        happening: form.happening,
      };

      const prizes = {
        name: form.name,
        url: form.url,
        organizer: form.organizer,
        prizePool: form.prizePool,
      };

      const speakersData = {
        name: form.name,
        url: form.url,
        speakers,
      };

      const scheduleData = {
        name: form.name,
        url: form.url,
        schedule,
      };

      await Promise.all([
        fetch('/api/create/overview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(overview),
        }),
        fetch('/api/create/prizes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prizes),
        }),
        fetch('/api/create/speakers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(speakersData),
        }),
        fetch('/api/create/schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(scheduleData),
        }),
        fetch('/api/create/temp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tempSummary),
  }),
      ]);

      alert('Request successfully sent to admin. Please wait for approval to create your hackathon.');
      resetForm();
    } catch (err) {
      console.error(err);
      alert('Failed to create hackathon');
    }
  };

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
      <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>Organize a Hackathon</h1>

      <input style={inputStyle} placeholder="Hackathon Name" value={form.name} onChange={e => handleFormChange('name', e.target.value)} />
      <input style={inputStyle} placeholder="Hackathon URL" value={form.url} onChange={e => handleFormChange('url', e.target.value)} />
      <input style={inputStyle} placeholder="Banner Image URL" value={form.image} onChange={e => handleFormChange('image', e.target.value)} />
      <input style={inputStyle} placeholder="Runs From (e.g. Apr 25 - May 17, 2025)" value={form.runsFrom} onChange={e => handleFormChange('runsFrom', e.target.value)} />
      <input style={inputStyle} placeholder="Discord Link" value={form.discord} onChange={e => handleFormChange('discord', e.target.value)} />
      <input style={inputStyle} placeholder="Twitter Link" value={form.twitter} onChange={e => handleFormChange('twitter', e.target.value)} />
      <input style={inputStyle} placeholder="Mode (Online/Offline)" value={form.happening} onChange={e => handleFormChange('happening', e.target.value)} />
      <input style={inputStyle} placeholder="Organizer Name" value={form.organizer} onChange={e => handleFormChange('organizer', e.target.value)} />
      <input style={inputStyle} placeholder="Prize Pool (e.g. 10.5 ETH)" value={form.prizePool} onChange={e => handleFormChange('prizePool', e.target.value)} />

      {/* Speakers */}
      <h2>Speakers</h2>
      {speakers.map((s, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input style={{ ...inputStyle, flex: 1 }} placeholder="Name" value={s.name} onChange={e => handleSpeakerChange(i, 'name', e.target.value)} />
          <input style={{ ...inputStyle, flex: 1 }} placeholder="Title" value={s.title} onChange={e => handleSpeakerChange(i, 'title', e.target.value)} />
          <input style={{ ...inputStyle, flex: 1 }} placeholder="Image URL" value={s.image} onChange={e => handleSpeakerChange(i, 'image', e.target.value)} />
          <input style={{ ...inputStyle, flex: 1 }} placeholder="Link (X/LinkedIn)" value={s.link} onChange={e => handleSpeakerChange(i, 'link', e.target.value)} />
        </div>
      ))}
      <button onClick={addSpeaker} style={{ marginBottom: '1.5rem', cursor: 'pointer' }}>+ Add Speaker</button>

      {/* Schedule */}
      <h2>Schedule</h2>
      {schedule.map((e, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input style={{ ...inputStyle, flex: 1 }} placeholder="Date (e.g. 25 Apr 2025)" value={e.date} onChange={ev => handleScheduleChange(i, 'date', ev.target.value)} />
          <input style={{ ...inputStyle, flex: 1 }} placeholder="Time (e.g. 11:59 PM)" value={e.time} onChange={ev => handleScheduleChange(i, 'time', ev.target.value)} />
          <input style={{ ...inputStyle, flex: 1 }} placeholder="Title (e.g. Registrations end)" value={e.title} onChange={ev => handleScheduleChange(i, 'title', ev.target.value)} />
        </div>
      ))}
      <button onClick={addSchedule} style={{ marginBottom: '1.5rem', cursor: 'pointer' }}>+ Add Schedule Item</button>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
  <button
    onClick={handleSubmit}
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
    Create Hackathon
  </button>
</div>

    </main>
  );
}
