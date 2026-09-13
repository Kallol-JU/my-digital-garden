import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default function ProjectDetail() {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8080/api/projects/${slug}`);
                setProject(response.data);
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [slug]);

    if (loading) return <div className="animate-fade-in max-w-2xl text-gray-500">Loading build logs...</div>;
    if (!project) return <div className="animate-fade-in max-w-2xl text-gray-900">Project not found.</div>;

    return (
        <div className="animate-fade-in max-w-2xl">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">{project.title}</h1>
            <p className="text-gray-600 mb-4 leading-relaxed">
                {project.description}
            </p>

            <div className="flex gap-4 text-sm text-emerald-600 mb-16">
                {project.liveLink && project.liveLink !== '#' && <a href={project.liveLink} target="_blank" rel="noreferrer" className="hover:underline">link</a>}
                {project.githubLink && project.githubLink !== '#' && <a href={project.githubLink} target="_blank" rel="noreferrer" className="hover:underline">github</a>}
            </div>

            {/* Renders dynamic markdown if you add a 'content' field to your DB later */}
            <article className="prose prose-emerald prose-gray max-w-none text-gray-800">
                {project.content ? (
                    <ReactMarkdown>{project.content}</ReactMarkdown>
                ) : (
                    <p className="italic text-gray-400">Detailed build notes coming soon.</p>
                )}
            </article>

            <div className="mt-24 pt-8 border-t border-gray-100 text-sm">
                <div className="text-center">
                    <Link to="/projects" className="text-gray-500 hover:text-gray-900 transition-colors">
                        All projects
                    </Link>
                </div>
            </div>
        </div>
    );
}