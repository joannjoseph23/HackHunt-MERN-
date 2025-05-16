const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  name: String,
  date: String,
  location: String,
  link: String
});

module.exports = mongoose.model('Hackathon', hackathonSchema);
