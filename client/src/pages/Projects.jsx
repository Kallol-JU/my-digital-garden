import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 5;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/api/projects');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Gather all unique tags from your projects database
    const allTags = ['all', ...new Set(projects.flatMap(p => p.techStack || []))];

    // Strict filtering: matches 'all' or checks if the project's techStack includes the exact selected tag
    const filteredProjects = selectedTag === 'all'
        ? projects
        : projects.filter(p => p.techStack && p.techStack.map(t => t.toLowerCase()).includes(selectedTag.toLowerCase()));

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage) || 1;
    const indexOfLast = currentPage * projectsPerPage;
    const indexOfFirst = indexOfLast - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

    return (
        <div className="animate-fade-in max-w-2xl">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Projects</h1>
            <p className="text-gray-600 mb-8">Notes and build logs from ongoing/finished projects.</p>

            {/* Dynamic Category Filter Bar */}
            <div className="flex flex-wrap gap-4 mb-12 text-sm">
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => { setSelectedTag(tag); setCurrentPage(1); }}
                        className={`transition-colors capitalize ${selectedTag === tag ? 'text-gray-900 font-bold underline' : 'text-gray-400 hover:text-gray-700'}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {loading ? (
                <p className="text-gray-400 text-sm">Loading projects...</p>
            ) : (
                <div className="space-y-12">
                    {currentProjects.length === 0 ? (
                        <p className="text-gray-400 text-sm">No projects found in this category.</p>
                    ) : (
                        currentProjects.map((project) => (
                            <div key={project.slug} className="group">
                                <Link to={`/projects/${project.slug}`} className="text-blue-600 hover:underline block text-lg mb-1 font-medium">
                                    {project.title}
                                </Link>
                                <p className="text-gray-500 text-sm leading-relaxed">{project.description}</p>
                            </div>
                        ))
                    )}

                    {/* Pagination */}
                    <div className="mt-20 pt-8 border-t border-gray-100 flex justify-between items-center text-sm">
                        {currentPage > 1 ? (
                            <button onClick={() => setCurrentPage(prev => prev - 1)} className="text-blue-600 hover:underline">
                                ← Previous
                            </button>
                        ) : <div />}

                        <span className="text-gray-400">Page {currentPage} of {totalPages}</span>

                        {currentPage < totalPages ? (
                            <button onClick={() => setCurrentPage(prev => prev + 1)} className="text-blue-600 hover:underline">
                                Next →
                            </button>
                        ) : <div />}
                    </div>
                </div>
            )}
        </div>
    );
}