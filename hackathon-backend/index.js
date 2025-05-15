const express = require('express');
const cors = require('cors');
const hackathons = require('./hackathons');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const reminders = [];

// GET: List of Hackathons
app.get('/api/hackathons', (req, res) => {
  const result = hackathons.map(h => ({
    id: h.id,
    name: h.name,
    date: h.date,
    location: h.location,
    registrationLink: h.link
  }));
  res.json(result);
});

// GET: Single Hackathon by ID
app.get('/api/hackathons/:id', (req, res) => {
  const hackathon = hackathons.find(h => h.id === parseInt(req.params.id));
  if (!hackathon) return res.status(404).json({ error: "Hackathon not found" });
  res.json(hackathon);
});

// GET: All reminders (mock)
app.get('/api/reminders', (req, res) => {
  res.json(reminders);
});

// POST: Set Reminder
app.post('/api/reminders', (req, res) => {
  const { userId, hackathonId, reminderTime } = req.body;

  if (!userId || !hackathonId || !reminderTime) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  const reminder = { id: reminders.length + 1, userId, hackathonId, reminderTime };
  reminders.push(reminder);
  res.status(201).json(reminder);
});

// Default fallback
app.get('/', (req, res) => {
  res.send('HackHunt Backend is Running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
