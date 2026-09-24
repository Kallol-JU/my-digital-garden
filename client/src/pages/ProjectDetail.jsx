import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8080/api";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [prevProject, setPrevProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/projects/${slug}`);
        // Matches the backend structure returning { project, prevProject, nextProject }
        setProject(response.data.project);
        setPrevProject(response.data.prevProject);
        setNextProject(response.data.nextProject);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading)
    return (
      <div className="animate-fade-in max-w-2xl text-gray-500 pt-12">
        Loading build logs...
      </div>
    );
  if (!project)
    return (
      <div className="animate-fade-in max-w-2xl text-gray-900 pt-12">
        Project not found.
      </div>
    );

  return (
    <div className="animate-fade-in max-w-2xl">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{project.title}</h1>
      <p className="text-gray-600 mb-4 leading-relaxed">
        {project.description}
      </p>

      <div className="flex gap-4 text-sm text-blue-600 mb-12">
        {project.liveLink && project.liveLink !== "#" && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            link
          </a>
        )}
        {project.githubLink && project.githubLink !== "#" && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            github
          </a>
        )}
      </div>

      <article
        className="prose prose-gray max-w-none text-gray-800 space-y-6 leading-relaxed 
  [&>p]:mb-6 
  [&>ul]:my-6 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-2 
  [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-10 [&>h3]:mb-4 
  [&>img]:my-8 [&>img]:rounded-md [&>img]:border [&>img]:border-gray-100"
      >
        <ReactMarkdown
          components={{
            img: ({ node, ...props }) => (
              <img
                {...props}
                className="my-6 rounded-lg border border-gray-200 shadow-sm w-full object-cover"
                alt={props.alt || ""}
              />
            ),
          }}
        >
          {project.content}
        </ReactMarkdown>
      </article>

      {/* Pagination / Bottom Navigation Footer */}
      <div className="mt-20 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center text-[14px]">
          <div className="w-1/3">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.slug}`}
                className="text-blue-600 hover:underline"
              >
                ← {prevProject.title}
              </Link>
            ) : (
              <span />
            )}
          </div>

          <div className="w-1/3 text-center">
            <Link
              to="/projects"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              All projects
            </Link>
          </div>

          <div className="w-1/3 text-right">
            {nextProject ? (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="text-blue-600 hover:underline"
              >
                {nextProject.title} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
