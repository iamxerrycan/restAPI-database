const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  fileUrls: {
    type: [String],  // Array of file URLs
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,  // Ensure every appointment is linked to a user
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
