const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  registeredHackathons: [
    {
      hackathonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hackathon'
      },
      registeredOn: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
