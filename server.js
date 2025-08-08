const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (or any other database)
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

  app.get('/', (req, res) => {
    res.send('MongoDB Connection Successful');
  });

// Define User model (using Mongoose)
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  fullName: String,
  age: Number,
  phone: String,
  department: String,
});

const User = mongoose.model('User', UserSchema);

// Define the register route
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, fullName, age, phone, department } = req.body;

    // Validate incoming data (basic validation)
    if (!email || !password || !fullName || !age || !phone) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // Create a new user
    const newUser = new User({ email, password, fullName, age, phone, department });
    
    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }
    res.status(200).send({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
