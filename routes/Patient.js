// routes/patient.js
const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Create a new patient
router.post('/', async (req, res) => {
  const newPatient = new Patient(req.body);
  try {
    const savedPatient = await newPatient.save();
    res.status(200).json(savedPatient);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
