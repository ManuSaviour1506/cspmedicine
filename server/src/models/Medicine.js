// server/src/models/Medicine.js
const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  time: { type: String, required: true }, // e.g., "09:00"
  frequency: { type: String, required: true, default: "Daily" },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  photoURL: { type: String },
  lastTaken: { type: Date },
});

const Medicine = mongoose.model('Medicine', medicineSchema);
module.exports = Medicine;