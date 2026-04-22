const mongoose = require('mongoose');
const Education = require('./models/Education');
require('dotenv').config();

const educationData = [
  {
    institution: 'Adama Science and Technology University',
    degree: "Bachelor's Degree in Software Engineering",
    duration: '2023 – 2027',
    location: 'Adama, Ethiopia',
    points: [
      'CGPA: 3.71/4.0',
      'Relevant courses: Software Architecture and Design, Database Systems, Computer Networking, Web Development, Mobile Application Development, Operating Systems'
    ],
    order: 0
  },
  {
    institution: 'Africa to Silicon Valley (A2SV)',
    degree: 'Data Structures and Algorithms',
    duration: 'One-year training',
    location: 'In-person · Adama, Ethiopia',
    points: [
      'Completed a year-long competitive programming training, solving 1000+ problems on LeetCode, Codeforces and HackerRank.',
      'Developed advanced problem-solving skills and deepened understanding of complex data structures and algorithmic paradigms.'
    ],
    order: 1
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding Education...');
    
    // Clear existing
    await Education.deleteMany({});
    console.log('Cleared existing education data.');

    // Insert new
    await Education.insertMany(educationData);
    console.log('Seeded education data successfully.');

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
  }
}

seed();
