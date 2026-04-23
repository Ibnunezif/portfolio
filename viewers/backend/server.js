const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');

// Models
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const About = require('./models/About');
const CV = require('./models/CV');
const Education = require('./models/Education');
const Experience = require('./models/Experience');
const Testimonial = require('./models/Testimonial');
const Category = require('./models/Category');

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

// Public About Endpoint
app.get('/api/about', async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about || { paragraphs: [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch About content' });
  }
});

// Public CV Endpoint
app.get('/api/cv', async (req, res) => {
  try {
    const cv = await CV.findOne();
    res.json(cv || { cvUrl: '' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch CV' });
  }
});

// Public Experience Endpoint
app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
});

// Public Education Endpoint
app.get('/api/education', async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch education' });
  }
});

// Public Testimonial Endpoint
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Public Categories Endpoint
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.listen(PORT, () => {
  console.log(`Viewer Backend server running at http://localhost:${PORT}`);
});
