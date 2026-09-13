const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Goal', goalSchema);