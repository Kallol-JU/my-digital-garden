const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true }, // True Date type for proper sorting
    description: { type: String, default: '' },
    link: { type: String },
    type: { type: String, enum: ['project', 'exam', 'milestone', 'life'], default: 'milestone' }
});

module.exports = mongoose.model('Timeline', timelineSchema);