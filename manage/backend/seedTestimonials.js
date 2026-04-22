const mongoose = require('mongoose');
const Testimonial = require('./models/Testimonial');
require('dotenv').config();

const testimonials = [
  {
    name: "Mebatsion Sahle",
    role: "Business Analyst · Data Scientist · Full-Stack Developer",
    content: "I am writing to strongly endorse Abdulbasit for any opportunity he decides to pursue. Abdulbasit has continually displayed excellent traits that make him an exceptional individual, both professionally and personally, throughout the time I have known him.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mebatsion",
    linkedInUrl: "https://linkedin.com",
    order: 0
  },
  {
    name: "Dagmawi Tadesse",
    role: "Senior Software Engineer · A2SV Mentor",
    content: "Working with Abdulbasit was a great experience. His problem-solving skills and dedication to high-quality code are outstanding. He consistently delivers beyond expectations and is a great team player.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dagmawi",
    linkedInUrl: "https://linkedin.com",
    order: 1
  },
  {
    name: "Henok Birhanu",
    role: "Full Stack Developer · Project Manager",
    content: "Abdulbasit is one of the most talented developers I've worked with. His ability to grasp complex architectures and implement them efficiently is rare. He's also a great mentor to others.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henok",
    linkedInUrl: "https://linkedin.com",
    order: 2
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding Testimonials...');
    
    await Testimonial.deleteMany({});
    console.log('Cleared existing testimonials.');

    await Testimonial.insertMany(testimonials);
    console.log('Seeded testimonials successfully.');

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
  }
}

seed();
