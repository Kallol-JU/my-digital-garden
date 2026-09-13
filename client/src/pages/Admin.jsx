import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080/api';

export default function Admin() {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState('');

    // Blog states
    const [blogForm, setBlogForm] = useState({ title: '', slug: '', description: '', content: '' });
    const [writings, setWritings] = useState([]);
    const [status, setStatus] = useState('');
    const [projectForm, setProjectForm] = useState({ title: '', slug: '', description: '', techStack: '', githubLink: '', liveLink: '', content: '' });
    const [projects, setProjects] = useState([]);

    // Timeline states
    const [timelineForm, setTimelineForm] = useState({ title: '', date: '', description: '', link: '' });
    const [timelineEvents, setTimelineEvents] = useState([]);

    useEffect(() => {
        fetchGoals();
        fetchTimeline();
        fetchWritings();
        fetchProjects();
    }, []);

    const fetchGoals = async () => {
        const response = await axios.get(`${API_URL}/list100`);
        setGoals(response.data);
    };

    const fetchTimeline = async () => {
        const response = await axios.get(`${API_URL}/timeline`);
        setTimelineEvents(response.data);
    };

    const fetchWritings = async () => {
        const response = await axios.get(`${API_URL}/writings`);
        setWritings(response.data);
    };

    const fetchProjects = async () => {
        const response = await axios.get(`${API_URL}/projects`);
        setProjects(response.data);
    };

    const submitProject = async (e) => {
        e.preventDefault();
        try {
            const formattedTags = typeof projectForm.techStack === 'string'
                ? projectForm.techStack.split(',').map(s => s.trim().toLowerCase())
                : projectForm.techStack;

            await axios.post(`${API_URL}/projects`, {
                ...projectForm,
                techStack: formattedTags
            });

            alert('✅ Project published successfully!');
            setProjectForm({ title: '', slug: '', description: '', techStack: '', githubLink: '', liveLink: '', content: '' });
            fetchProjects();
        } catch (error) {
            alert('❌ Error publishing project.');
        }
    };

    const deleteProject = async (slug) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            await axios.delete(`${API_URL}/projects/${slug}`);
            fetchProjects();
        }
    };

    // List 100 handlers
    const addGoal = async (e) => {
        e.preventDefault();
        if (!newGoal.trim()) return;
        await axios.post(`${API_URL}/list100`, { text: newGoal });
        setNewGoal('');
        fetchGoals();
    };

    const toggleGoal = async (id) => {
        await axios.put(`${API_URL}/list100/${id}`);
        fetchGoals();
    };

    const deleteGoal = async (id) => {
        if (window.confirm('Delete this goal?')) {
            await axios.delete(`${API_URL}/list100/${id}`);
            fetchGoals();
        }
    };

    // Blog handlers
    const submitBlog = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/writings`, blogForm);
            setStatus('✅ Note published successfully!');
            setBlogForm({ title: '', slug: '', description: '', content: '' });
            fetchWritings();
        } catch (error) {
            setStatus('❌ Error publishing note.');
        }
    };

    const deleteWriting = async (slug) => {
        if (window.confirm('Are you sure you want to delete this writing?')) {
            await axios.delete(`${API_URL}/writings/${slug}`);
            fetchWritings();
        }
    };

    // Timeline handlers
    const submitTimeline = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/timeline`, timelineForm);
            setTimelineForm({ title: '', date: '', description: '', link: '' });
            fetchTimeline();
        } catch (error) {
            console.error('Error adding timeline event', error);
        }
    };

    const deleteTimeline = async (id) => {
        if (window.confirm('Delete this milestone?')) {
            await axios.delete(`${API_URL}/timeline/${id}`);
            fetchTimeline();
        }
    };

    return (
        <div className="animate-fade-in max-w-2xl space-y-16 pb-20">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Command Center</h1>

            {/* List 100 Manager */}
            <div>
                <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Manage List 100</h2>
                <form onSubmit={addGoal} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Add a new goal..."
                        className="flex-1 p-2 border border-gray-200 rounded outline-none focus:border-emerald-500 text-sm"
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                    />
                    <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition-colors">
                        Add
                    </button>
                </form>

                <ul className="space-y-2">
                    {goals.map((goal) => (
                        <li key={goal._id} className="group p-2 hover:bg-gray-50 rounded transition-colors flex justify-between items-center text-sm">
                            <div onClick={() => toggleGoal(goal._id)} className="cursor-pointer flex gap-3 items-center flex-1">
                                <div className={`w-4 h-4 border rounded flex items-center justify-center ${goal.completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}>
                                    {goal.completed && <span className="text-white text-xs">✓</span>}
                                </div>
                                <span className={goal.completed ? 'text-gray-400 line-through' : 'text-gray-800'}>
                                    {goal.text}
                                </span>
                            </div>
                            <button onClick={() => deleteGoal(goal._id)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity px-2">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Blog Publisher & Manager */}
            <div className="pt-8 border-t border-gray-100">
                <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Publish a Note</h2>
                <form onSubmit={submitBlog} className="space-y-4 mb-8">
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full p-2 border border-gray-200 rounded outline-none focus:border-emerald-500 text-sm"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="URL Slug (e.g., my-new-post)"
                        className="w-full p-2 border border-gray-200 rounded outline-none focus:border-emerald-500 text-sm"
                        value={blogForm.slug}
                        onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value.toLowerCase() })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Short Description / Subtitle"
                        className="w-full p-2 border border-gray-200 rounded outline-none focus:border-emerald-500 text-sm"
                        value={blogForm.description}
                        onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })}
                    />
                    <textarea
                        placeholder="Markdown content..."
                        className="w-full p-2 border border-gray-200 rounded outline-none focus:border-emerald-500 h-48 font-mono text-sm"
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        required
                    />
                    <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded text-sm hover:bg-emerald-700 transition-colors">
                        Publish to /writings
                    </button>
                    {status && <p className="text-sm mt-2 text-gray-600">{status}</p>}
                </form>

                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Existing Writings</h3>
                <ul className="space-y-2">
                    {writings.map((post) => (
                        <li key={post.slug} className="group p-2 hover:bg-gray-50 rounded transition-colors flex justify-between items-center text-sm">
                            <span className="text-gray-800 font-medium">{post.title} <span className="text-gray-400 font-normal">({post.slug})</span></span>
                            <button
                                onClick={() => deleteWriting(post.slug)}
                                className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity px-2"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Timeline Manager */}
            <div className="pt-8 border-t border-gray-100">
                <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Add Timeline Milestone</h2>
                <form onSubmit={submitTimeline} className="space-y-4 mb-8">
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full p-2 border border-gray-200 rounded outline-none focus:border-emerald-500 text-sm"
                        value={timelineForm.title}
                        onChange={(e) => setTimelineForm({ ...timelineForm, title: e.target.value })}
                        required
                    />
                    <input
                        type="date"
                        className="w-full p-2 border border-gray-200 rounded outline-none focus:border-emerald-500 text-sm"
                        value={timelineForm.date}
                        onChange={(e) => setTimelineForm({ ...timelineForm, date: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Optional Link"
                        className="w-full p-2 border border-gray-200 rounded outline-none focus:border-emerald-500 text-sm"
                        value={timelineForm.link}
                        onChange={(e) => setTimelineForm({ ...timelineForm, link: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Extra details"
                        className="w-full p-2 border border-gray-200 rounded outline-none focus:border-emerald-500 text-sm"
                        value={timelineForm.description}
                        onChange={(e) => setTimelineForm({ ...timelineForm, description: e.target.value })}
                    />
                    <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition-colors">
                        Add to Timeline
                    </button>
                </form>

                <ul className="space-y-2">
                    {timelineEvents.map((event) => (
                        <li key={event._id} className="group p-2 hover:bg-gray-50 rounded transition-colors flex justify-between items-center text-sm">
                            <span className="text-gray-800 font-medium">{event.title} <span className="text-gray-400 font-normal">({new Date(event.date).getFullYear()})</span></span>
                            <button onClick={() => deleteTimeline(event._id)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity px-2">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Project Publisher & Manager */}
            <div className="pt-8 border-t border-gray-100">
                <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Publish a Project</h2>
                <form onSubmit={submitProject} className="space-y-4 mb-8">
                    <input
                        type="text"
                        placeholder="Title (e.g., WeatherGpt)"
                        className="w-full p-2 border border-gray-200 rounded text-sm outline-none focus:border-emerald-500"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="URL Slug (e.g., weather-gpt)"
                        className="w-full p-2 border border-gray-200 rounded text-sm outline-none focus:border-emerald-500"
                        value={projectForm.slug}
                        onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value.toLowerCase() })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Short Description"
                        className="w-full p-2 border border-gray-200 rounded text-sm outline-none focus:border-emerald-500"
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Tech Stack (comma-separated: React, Node.js, MongoDB)"
                        className="w-full p-2 border border-gray-200 rounded text-sm outline-none focus:border-emerald-500"
                        value={projectForm.techStack}
                        onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="GitHub Link URL"
                        className="w-full p-2 border border-gray-200 rounded text-sm outline-none focus:border-emerald-500"
                        value={projectForm.githubLink}
                        onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Live Website Link URL"
                        className="w-full p-2 border border-gray-200 rounded text-sm outline-none focus:border-emerald-500"
                        value={projectForm.liveLink}
                        onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                    />
                    <textarea
                        placeholder="Markdown build logs & details (Use ![alt](/images/filename.png) for images)..."
                        className="w-full p-2 border border-gray-200 rounded outline-none focus:border-emerald-500 h-48 font-mono text-sm"
                        value={projectForm.content}
                        onChange={(e) => setProjectForm({ ...projectForm, content: e.target.value })}
                    />
                    <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded text-sm hover:bg-emerald-700 transition-colors">
                        Publish Project
                    </button>
                </form>

                <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Existing Projects</h3>
                <ul className="space-y-2">
                    {projects.map((proj) => (
                        <li key={proj.slug} className="group p-2 hover:bg-gray-50 rounded transition-colors flex justify-between items-center text-sm">
                            <span className="text-gray-800 font-medium">{proj.title} <span className="text-gray-400 font-normal">({proj.slug})</span></span>
                            <button
                                onClick={() => deleteProject(proj.slug)}
                                className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity px-2"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}