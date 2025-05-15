const express = require('express');
const app = express();

app.use(express.json()); // for parsing JSON request bodies

// Simple welcome route
app.get('/', (req, res) => {
  res.send('Welcome to Hackathon Backend!');
});
// Sample hackathon data
const hackathons = [
  { id: 1, name: "Hackathon A", date: "2025-06-15", registrationLink: "https://collegeA.edu/register" },
  { id: 2, name: "Hackathon B", date: "2025-07-01", registrationLink: "https://collegeB.edu/register" }
];

app.get('/api/hackathons', (req, res) => {
  res.json(hackathons);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const reminders = [];

app.post('/api/reminders', (req, res) => {
  const { userId, hackathonId, reminderTime } = req.body;
  if (!userId || !hackathonId || !reminderTime) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }
  const reminder = { id: reminders.length + 1, userId, hackathonId, reminderTime };
  reminders.push(reminder);
  res.status(201).json(reminder);
});
app.get('/api/hackathons/:id', (req, res) => {
  const hackathon = hackathons.find(h => h.id === parseInt(req.params.id));
  if (!hackathon) return res.status(404).json({ error: "Hackathon not found" });
  res.json(hackathon);
});
app.get('/api/reminders', (req, res) => {
  res.json(reminders);
});
