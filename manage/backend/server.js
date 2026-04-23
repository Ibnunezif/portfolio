const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Models
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const CV = require('./models/CV');
const About = require('./models/About');
const Experience = require('./models/Experience');
const Education = require('./models/Education');
const Testimonial = require('./models/Testimonial');
const Category = require('./models/Category');

// ... (existing configuration and endpoints) ...

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio_images',
    allowed_formats: ['jpg', 'png', 'jpeg', 'svg'],
  },
});
const upload = multer({ storage });

const app = express();
const PORT = process.env.PORT || 3002;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(cors());
app.use(express.json());

// About CRUD Endpoints
app.get('/api/about', async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about || { paragraphs: [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch About content' });
  }
});

app.post('/api/about', async (req, res) => {
  try {
    const { paragraphs } = req.body;
    let about = await About.findOne();
    if (about) {
      about.paragraphs = paragraphs;
      await about.save();
    } else {
      about = new About({ paragraphs });
      await about.save();
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update About content' });
  }
});

// CV CRUD Endpoints
app.get('/api/cv', async (req, res) => {
  try {
    const cv = await CV.findOne();
    res.json(cv || { cvUrl: '' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch CV' });
  }
});

app.post('/api/cv', async (req, res) => {
  try {
    const { cvUrl } = req.body;
    let cv = await CV.findOne();
    if (cv) {
      cv.cvUrl = cvUrl;
      await cv.save();
    } else {
      cv = new CV({ cvUrl });
      await cv.save();
    }
    res.json(cv);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update CV' });
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
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

// Upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: req.file.path });
});

// Projects CRUD Endpoints
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Skills CRUD Endpoints
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

app.post('/api/skills', async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create skill' });
  }
});

app.put('/api/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update skill' });
  }
});

app.delete('/api/skills/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

// Skills CRUD Endpoints
// ... (existing skills endpoints)

// Experience CRUD Endpoints
app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
});

app.post('/api/experiences', async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create experience' });
  }
});

app.put('/api/experiences/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update experience' });
  }
});

app.delete('/api/experiences/:id', async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete experience' });
  }
});

// Experience CRUD Endpoints
// ... (existing experience endpoints)

// Education CRUD Endpoints
app.get('/api/education', async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch education' });
  }
});

app.post('/api/education', async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create education' });
  }
});

app.put('/api/education/:id', async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update education' });
  }
});

app.delete('/api/education/:id', async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete education' });
  }
});

// Education CRUD Endpoints
// ... (existing education endpoints)

// Testimonial CRUD Endpoints
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

app.post('/api/testimonials', async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

app.put('/api/testimonials/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

app.delete('/api/testimonials/:id', async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

// Category CRUD Endpoints
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

app.listen(PORT, () => {
  console.log(`Management Backend server running at http://localhost:${PORT}`);
});
