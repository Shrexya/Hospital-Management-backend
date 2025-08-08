// models/Doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  contact: String,
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
