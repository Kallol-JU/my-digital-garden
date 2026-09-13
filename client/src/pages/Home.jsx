import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="animate-fade-in max-w-[650px] pt-12 pb-20">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Kallol's Garden 🌱</h1>

            <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed mb-16">
                <p>
                    Notes, projects, and loose thoughts from my time as a final year CSE student, my work exploring the MERN stack, and things I build on my own.
                </p>
                <p>
                    Mostly full-stack web development, machine learning, and ai.
                </p>
            </div>

            <div className="mb-14">
                <h2 className="text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-6">Around Here</h2>
                <ul className="space-y-5 text-[15px]">
                    <li>
                        <Link to="/writings" className="group flex items-center">
                            <span className="text-blue-600">/writings</span>
                            <span className="text-gray-500 ml-2">— blogs, shower thoughts, rants</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/projects" className="group flex items-center">
                            <span className="text-blue-600">/projects</span>
                            <span className="text-gray-500 ml-2">— experiments and builds</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/timeline" className="group flex items-center">
                            <span className="text-blue-600">/timeline</span>
                            <span className="text-gray-500 ml-2">— progress and milestones</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/list100" className="group flex items-center">
                            <span className="text-blue-600">/list100</span>
                            <span className="text-gray-500 ml-2">— goals and wishes</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="mb-16">
                <h2 className="text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-6">Elsewhere</h2>
                <div className="flex gap-5 text-gray-400">
                    {/* X / Twitter */}
                    <a href="https://x.com/KallolM69942175" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                    {/* Instagram */}
                    <a href="https://www.instagram.com/whomukherjee/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                        <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                    </a>
                    {/* LinkedIn */}
                    <a href="https://www.linkedin.com/in/kallol-mukherjee-444124389/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                        <svg className="w-[17px] h-[17px] fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    </a>
                    {/* GitHub */}
                    <a href="https://github.com/Kallol-JU" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                        <svg className="w-[17px] h-[17px] fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </a>
                </div>
            </div>

            <hr className="border-gray-100 mb-6" />

            <p className="text-[13px] text-gray-500">
                got an ai agent? give it <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">this</a> and ask about me or read my resume <a href="/Kallol_resume.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">here</a>.
            </p>
        </div>
    );
}
