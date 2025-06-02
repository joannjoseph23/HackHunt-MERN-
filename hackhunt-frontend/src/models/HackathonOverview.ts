// src/models/HackathonOverview.ts
import mongoose from 'mongoose';

const hackathonOverviewSchema = new mongoose.Schema({
  name: String,
  url: String,
  image: String,
  twitter: String,
  discord: String,
  happening: String,
  runsFrom: String,
});

export default mongoose.models.HackathonOverview ||
  mongoose.model('HackathonOverview', hackathonOverviewSchema);
