const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // Add this line
    description: { type: String, required: true },
    content: { type: String }, // Add this line for the Markdown logs
    techStack: [{ type: String }],
    githubLink: { type: String },
    liveLink: { type: String },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);