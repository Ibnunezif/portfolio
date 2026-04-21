const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');

// Models
const Skill = require('./models/Skill');
const Project = require('./models/Project');

const app = express();
const PORT = process.env.PORT || 3002; // Different port for management backend
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to verify Google Token
async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    
    if (payload.email !== process.env.OWNER_EMAIL) {
      return res.status(403).json({ error: 'Unauthorized user' });
    }
    
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token: ' + error.message });
  }
}

// Skills Endpoints (Protected)
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

app.post('/api/skills', verifyToken, async (req, res) => {
  try {
    const skills = req.body;
    await Skill.deleteMany({});
    await Skill.insertMany(skills);
    res.json({ message: 'Skills updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update skills' });
  }
});

// Projects Endpoints (Protected)
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.listen(PORT, () => {
  console.log(`Management Backend server running at http://localhost:${PORT}`);
});
