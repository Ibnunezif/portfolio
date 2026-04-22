const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

const projectData = [
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce site with product search, cart, and payment integration.",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "Web"
  },
  {
    title: "AI Image Generator",
    description: "An application that generates unique images from text prompts using a custom model.",
    technologies: ["React", "Python", "FastAPI", "TensorFlow"],
    githubUrl: "https://github.com",
    category: "AI/ML"
  },
  {
    title: "Task Management CLI",
    description: "A powerful CLI tool for managing personal tasks and project workflows.",
    technologies: ["Node.js", "Commander.js"],
    githubUrl: "https://github.com",
    category: "Open Source"
  },
  {
    title: "Stock Analysis Desktop",
    description: "Desktop application for real-time stock market analysis and visualization.",
    technologies: ["Electron", "React", "D3.js"],
    githubUrl: "https://github.com",
    category: "Desktop"
  },
  {
    title: "Smart Home Dashboard",
    description: "Centralized dashboard for controlling smart home devices across multiple protocols.",
    technologies: ["Next.js", "MQTT", "Redis"],
    githubUrl: "https://github.com",
    category: "Web"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding Projects...');
    
    await Project.deleteMany({});
    console.log('Cleared existing projects.');

    await Project.insertMany(projectData);
    console.log('Seeded projects successfully.');

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
  }
}

seed();
