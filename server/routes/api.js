const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Timeline = require('../models/Timeline');
const Goal = require('../models/Goal');

// GET all projects
router.get('/projects', async (req, res) => {
    try {
        // Sort by newest first
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all blogs 
router.get('/writings', async (req, res) => {
    try {
        const blogs = await Blog.find().select('-content').sort({ date: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/timeline', async (req, res) => {
    try {
        const events = await Timeline.find().sort({ date: -1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/list100', async (req, res) => {
    try {
        const goals = await Goal.find();
        res.json(goals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single blog by its slug
router.get('/writings/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single project by its slug
router.get('/projects/:slug', async (req, res) => {
    try {
        const project = await Project.findOne({ slug: req.params.slug });
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const prevProject = await Project.findOne({ createdAt: { $lt: project.createdAt } })
            .sort({ createdAt: -1 })
            .select('title slug');

        const nextProject = await Project.findOne({ createdAt: { $gt: project.createdAt } })
            .sort({ createdAt: 1 })
            .select('title slug');

        res.json({ project, prevProject, nextProject });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/writings', async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/list100', async (req, res) => {
    try {
        const goal = await Goal.create({ text: req.body.text });
        res.status(201).json(goal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/timeline', async (req, res) => {
    try {
        const event = await Timeline.create(req.body);
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/list100/:id', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        goal.completed = !goal.completed;
        await goal.save();
        res.json(goal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/writings/:slug/like', async (req, res) => {
    try {
        const post = await Blog.findOneAndUpdate(
            { slug: req.params.slug },
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/projects', async (req, res) => {
    try {
        // Convert comma-separated techStack string into an array if needed
        const data = {
            ...req.body,
            techStack: typeof req.body.techStack === 'string'
                ? req.body.techStack.split(',').map(s => s.trim())
                : req.body.techStack
        };
        const newProject = await Project.create(data);
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a project by slug
router.delete('/projects/:slug', async (req, res) => {
    try {
        await Project.findOneAndDelete({ slug: req.params.slug });
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/list100/:id', async (req, res) => {
    try {
        await Goal.findByIdAndDelete(req.params.id);
        res.json({ message: 'Goal deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/timeline/:id', async (req, res) => {
    try {
        await Timeline.findByIdAndDelete(req.params.id);
        res.json({ message: 'Timeline event deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/writings/:slug', async (req, res) => {
    try {
        await Blog.findOneAndDelete({ slug: req.params.slug });
        res.json({ message: 'Writing deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;