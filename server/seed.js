const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB for seeding...'))
    .catch((err) => console.error('MongoDB connection error:', err));

const seedProjects = [
    {
        title: 'WeatherGpt',
        slug: 'weatherGpt',
        description: 'An AI-powered, Indian government-compliant meteorological disaster management and weather forecasting web application.',
        techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Gemini AI', 'Twilio', 'MapTiler', 'OpenWeather API'],
        githubLink: 'https://github.com/Kallol-JU/weatherGpt',
        liveLink: 'https://weather-gpt-gamma.vercel.app/'
    },
    {
        title: 'Finder',
        slug: 'finder',
        description: 'A full-stack Airbnb clone featuring custom map integration and location services utilizing MapTiler.',
        techStack: ['React', 'Node.js', 'MongoDB', 'MapTiler'],
        githubLink: 'https://github.com/Kallol-JU/Home-Finder',
        liveLink: 'https://home-finder-j5a1.onrender.com/listings'
    },
    {
        title: 'Collab-On-Canvas',
        slug: 'collab-on-canvas',
        description: 'A real-time, room-based collaborative whiteboard application built with WebSockets.',
        techStack: ['Socket.io', 'HTML5 Canvas', 'Node.js'],
        githubLink: 'https://github.com/Kallol-JU/Collab-whiteboard',
        liveLink: 'https://collab-whiteboard-ysad.onrender.com'
    },

];

const seedDB = async () => {
    try {
        // Clear out any accidental empty documents first
        await Project.deleteMany({});
        // Insert your actual projects
        await Project.insertMany(seedProjects);
        console.log('✅ Database successfully seeded with projects!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();