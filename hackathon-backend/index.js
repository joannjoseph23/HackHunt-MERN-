const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const hackathons = require('./hackathons');

app.use(express.json());

app.get('/api/hackathons', (req, res) => {
  res.json(hackathons);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
