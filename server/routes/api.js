const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Blog = require("../models/Blog");
const Timeline = require("../models/Timeline");
const Goal = require("../models/Goal");
const { Groq } = require("groq-sdk");

console.log(
  "My Groq API Key starts with:",
  process.env.GROQ_API_KEY
    ? process.env.GROQ_API_KEY.substring(0, 5)
    : "UNDEFINED!",
);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// GET all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all blogs
router.get("/writings", async (req, res) => {
  try {
    const blogs = await Blog.find().select("-content").sort({ date: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get the timeline
router.get("/timeline", async (req, res) => {
  try {
    const events = await Timeline.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get the list100
router.get("/list100", async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single blog by its slug
router.get("/writings/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single project by its slug
router.get("/projects/:slug", async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ message: "Project not found" });

    const prevProject = await Project.findOne({
      createdAt: { $lt: project.createdAt },
    })
      .sort({ createdAt: -1 })
      .select("title slug");

    const nextProject = await Project.findOne({
      createdAt: { $gt: project.createdAt },
    })
      .sort({ createdAt: 1 })
      .select("title slug");

    res.json({ project, prevProject, nextProject });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Chat route using Groq (Llama 3.3 Versatile) - lightning-fast & reliable
router.post("/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    const systemInstruction = `You are Kallol's personal AI assistant for his portfolio website (Kallol's Garden). 
    Your sole purpose is to represent Kallol, discuss his skills, experience, projects, and explain why he is a great hire.
       
    KALLOL'S BACKGROUND & RESUME:
    - Final-year Computer Science and Engineering (CSE) student at Government College Of Engineering And Ceramic Technology, kolkata.
    - Core Skills: Full-Stack Web Development, MERN stack (MongoDB, Express, React, Node.js), and Machine Learning.
    - GitHub: https://github.com/Kallol-JU 
    - Previous AI Web Developer Intern at InAmigos Foundation: Developed responsive frontend interfaces using React.js, improving cross-device usability and user experience. Integrated AI-powered recommendation features and tracked user engagement.

    STRICT GUARDRAILS (TOKEN SAVING):
    If the user asks you to write code, solve math, write an essay, translate text, or answer general knowledge questions completely unrelated to Kallol, his tech stack, or his portfolio, you MUST immediately decline. 

    Use a polite but firm generic response exactly like this: "I am Kallol's portfolio assistant, so this isn't my job! I'm only here to answer questions about his experience, projects, or background." 
    Do not attempt to fulfill the outside request.
    
    TONE:
    Conversational, professional, concise, and slightly witty.`;

    // Map conversation history into Groq's message schema format
    const formattedMessages = [
      { role: "system", content: systemInstruction },
      ...(Array.isArray(history)
        ? history.map((h) => ({
            role: h.role === "user" ? "user" : "assistant",
            content: h.parts?.[0]?.text || h.content || "",
          }))
        : []),
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const responseText =
      completion.choices[0]?.message?.content ||
      "I couldn't generate a response.";

    res.json({ reply: responseText });
  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(503).json({
      reply:
        "My AI assistant is taking a quick break! Please try asking again in a moment.",
    });
  }
});

router.post("/writings", async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/list100", async (req, res) => {
  try {
    const goal = await Goal.create({ text: req.body.text });
    res.status(201).json(goal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/timeline", async (req, res) => {
  try {
    const event = await Timeline.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/list100/:id", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    goal.completed = !goal.completed;
    await goal.save();
    res.json(goal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/writings/:slug/like", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is required to like a post." });
    }

    const post = await Blog.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: "Post not found" });

    const hasLiked = post.likes.includes(userId);
    const updateQuery = hasLiked
      ? { $pull: { likes: userId } }
      : { $addToSet: { likes: userId } };

    const updatedPost = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      updateQuery,
      { new: true },
    );

    res.json({
      success: true,
      hasLiked: !hasLiked,
      likesCount: updatedPost.likes.length,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/projects", async (req, res) => {
  try {
    const data = {
      ...req.body,
      techStack:
        typeof req.body.techStack === "string"
          ? req.body.techStack.split(",").map((s) => s.trim())
          : req.body.techStack,
    };
    const newProject = await Project.create(data);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/projects/:slug", async (req, res) => {
  try {
    await Project.findOneAndDelete({ slug: req.params.slug });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/list100/:id", async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: "Goal deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/timeline/:id", async (req, res) => {
  try {
    await Timeline.findByIdAndDelete(req.params.id);
    res.json({ message: "Timeline event deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/writings/:slug", async (req, res) => {
  try {
    await Blog.findOneAndDelete({ slug: req.params.slug });
    res.json({ message: "Writing deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
