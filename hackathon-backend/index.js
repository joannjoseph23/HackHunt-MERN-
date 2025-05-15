const express = require('express');
const cors = require('cors');
const hackathons = require('./hackathons');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET: List of Hackathons
app.get('/api/hackathons', (req, res) => {
  const result = hackathons.map(h => ({
    id: h.id,
    name: h.name,
    date: h.date,
    registrationLink: h.link
  }));
  res.json(result);
});

// POST: Set Reminder (simulated)
app.post('/api/reminders', (req, res) => {
  const { userId, hackathonId, reminderTime } = req.body;

  if (!userId || !hackathonId || !reminderTime) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // In a real app, you'd store this in a DB or scheduler
  console.log(`Reminder set for user ${userId} on hackathon ${hackathonId} at ${reminderTime}`);
  res.status(200).json({ message: 'Reminder set successfully' });
});

// Default fallback
app.get('/', (req, res) => {
  res.send('HackHunt Backend is Running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
