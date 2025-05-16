const mongoose = require('mongoose');
const Hackathon = require('./models/Hackathon');
const hackathons = require('./hackathons');

const MONGO_URI = 'mongodb+srv://joannjoseph23:myclusterpw@hackhuntcluster.trpm65i.mongodb.net/hackhunt';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('✅ Connected to MongoDB');

  // Clear existing data (optional)
  await Hackathon.deleteMany();

  // Insert from file
  await Hackathon.insertMany(hackathons);

  console.log(`🎉 Inserted ${hackathons.length} hackathons`);
  mongoose.disconnect();
}).catch(err => {
  console.error('❌ Error seeding data:', err);
});
