const mongoose = require('mongoose');
const Goal = require('./models/Goal');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const sampleGoals = [
    { text: 'Get married', completed: true },
    { text: 'Own a house', completed: false },
    { text: 'Own a car', completed: false },
    { text: 'Learn how to drive a car', completed: false },
    { text: 'Visit the Amazon rainforest', completed: false },
    { text: 'Go on a road trip', completed: true },
    { text: 'Camp outside in a forest', completed: false },
    { text: 'Run the NYC Marathon', completed: false },
    { text: 'Learn to swim', completed: true },
    { text: 'Take my parents on a flight', completed: false },
    { text: 'Score a goal in a football match', completed: true }
];

const seedDB = async () => {
    await Goal.deleteMany({});
    await Goal.insertMany(sampleGoals);
    console.log('✅ List 100 successfully seeded!');
    mongoose.connection.close();
};

seedDB();