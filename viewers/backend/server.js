const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');

// Models
const Skill = require('./models/Skill');
const Project = require('./models/Project');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    seedDatabase();
  })
  .catch(err => console.error('MongoDB connection error:', err));

const getDataPath = (filename) => path.join(__dirname, 'data', filename);

// Seed database from JSON if empty
async function seedDatabase() {
  try {
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      const skillsData = JSON.parse(fs.readFileSync(getDataPath('skills.json'), 'utf8'));
      await Skill.insertMany(skillsData);
      console.log('Skills seeded from JSON');
    }

    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const projectsData = JSON.parse(fs.readFileSync(getDataPath('projects.json'), 'utf8'));
      await Project.insertMany(projectsData);
      console.log('Projects seeded from JSON');
    }
  } catch (error) {
    console.error('Seeding error:', error);
  }
}

// Public Skills Endpoints
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// Public Projects Endpoints
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.listen(PORT, () => {
  console.log(`Viewer Backend server running at http://localhost:${PORT}`);
});
