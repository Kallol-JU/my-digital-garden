const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    link: { type: String },
    type: { type: String, enum: ['project', 'exam', 'milestone', 'life'], default: 'milestone' }
});

module.exports = mongoose.model('Timeline', timelineSchema);