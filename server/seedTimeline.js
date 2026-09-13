const mongoose = require('mongoose');
const Timeline = require('./models/Timeline');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const sampleEvents = [
    {
        title: 'Machine Learning Presentation',
        date: new Date('2026-05-15'),
        description: 'Delivered a technical presentation on ML evaluation metrics, covering precision, recall, and F1 scores.',
        type: 'milestone'
    },
    {
        title: 'Initialized Crochet Story',
        date: new Date('2026-05-01'),
        description: 'Started scaffolding a new MERN stack e-commerce project.',
        type: 'project'
    },
    {
        title: 'GATE CS 2026 Examination',
        date: new Date('2026-02-08'),
        description: 'Sat for the GATE CS exam after months of prep covering algorithms and computer networks.',
        type: 'exam'
    }
];

const seedDB = async () => {
    await Timeline.deleteMany({});
    await Timeline.insertMany(sampleEvents);
    console.log('✅ Timeline successfully seeded!');
    mongoose.connection.close();
};

seedDB();