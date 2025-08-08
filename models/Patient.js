// models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contact: String,
  medicalHistory: Array,
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
