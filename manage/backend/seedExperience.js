const mongoose = require('mongoose');
const Experience = require('./models/Experience');
require('dotenv').config();

const experiences = [
  {
    company: 'Company Name',
    role: 'Senior Software Engineer',
    duration: '2023 - Present',
    location: 'Remote',
    points: [
      'Led a team of engineers in developing scalable web applications using modern technologies.',
      'Architected and implemented complex backend systems with a focus on performance and security.',
      'Collaborated with cross-functional teams to define project requirements and deliver high-quality solutions.',
      'Mentored junior developers and conducted thorough code reviews to maintain high engineering standards.'
    ],
    order: 0
  },
  {
    company: 'Tech Solutions Inc.',
    role: 'Full Stack Developer',
    duration: '2021 - 2023',
    location: 'New York, USA',
    points: [
      'Developed and maintained multiple client-facing applications using React, Node.js, and PostgreSQL.',
      'Optimized application performance, resulting in a 30% reduction in load times.',
      'Implemented automated testing suites to ensure software reliability and reduce regression bugs.',
      'Integrated third-party APIs and services to enhance application functionality.'
    ],
    order: 1
  },
  {
    company: 'StartUp Hub',
    role: 'Frontend Developer',
    duration: '2019 - 2021',
    location: 'Remote',
    points: [
      'Built responsive and intuitive user interfaces using React and Tailwind CSS.',
      'Worked closely with designers to translate wireframes into high-fidelity code.',
      'Improved frontend state management using Redux and Context API.',
      'Participated in agile ceremonies and contributed to continuous process improvements.'
    ],
    order: 2
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');
    
    // Clear existing
    await Experience.deleteMany({});
    console.log('Cleared existing experiences.');

    // Insert new
    await Experience.insertMany(experiences);
    console.log('Seeded experiences successfully.');

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
  }
}

seed();
