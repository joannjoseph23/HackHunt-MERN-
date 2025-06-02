const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  name: String,
  slug: String,
  date: String,
  location: String,
  prize: String,
  teamSize: String,
  accommodation: String,
  mode: String,
  url: String
});

module.exports = mongoose.model('Hackathon', hackathonSchema);
