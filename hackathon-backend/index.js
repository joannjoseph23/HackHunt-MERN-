const express = require('express');
const cors = require('cors');
const Hackathon = require('./models/Hackathon');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
const MONGO_URI = 'mongodb+srv://joannjoseph23:myclusterpw@hackhuntcluster.trpm65i.mongodb.net/hackhunt';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

const reminders = [];

app.get('/api/hackathons', async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.json(hackathons);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});


// GET: Single Hackathon by ID
app.get('/api/hackathons/:id', async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) return res.status(404).json({ error: 'Hackathon not found' });
    res.json(hackathon);
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID format' });
  }
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
