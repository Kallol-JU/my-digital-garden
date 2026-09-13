import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080/api';

export default function Writings() {
    const [groupedPosts, setGroupedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        const fetchWritings = async () => {
            try {
                const response = await axios.get(`${API_URL}/writings`);

                // Group posts by Month and Year (e.g., "MAY 26")
                const groups = {};
                response.data.forEach(post => {
                    const date = new Date(post.date);
                    const monthYear = date.toLocaleDateString('en-US', {
                        month: 'short',
                        year: '2-digit'
                    }).toUpperCase().replace(',', '');

                    if (!groups[monthYear]) {
                        groups[monthYear] = [];
                    }
                    groups[monthYear].push(post);
                });

                const formattedGroups = Object.keys(groups).map(key => ({
                    month: key,
                    items: groups[key]
                }));

                setGroupedPosts(formattedGroups);
            } catch (error) {
                console.error('Error fetching writings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWritings();
    }, []);

    // Flatten all items for pagination matching the layout
    const allPosts = groupedPosts.flatMap(g => g.items);
    const totalPages = Math.ceil(allPosts.length / postsPerPage) || 1;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Re-group current page posts by month
    const currentGroups = {};
    currentPosts.forEach(post => {
        const date = new Date(post.date);
        const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }).toUpperCase().replace(',', '');
        if (!currentGroups[monthYear]) currentGroups[monthYear] = [];
        currentGroups[monthYear].push(post);
    });

    const renderGroups = Object.keys(currentGroups).map(key => ({
        month: key,
        items: currentGroups[key]
    }));

    return (
        <div className="animate-fade-in max-w-2xl">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Writings</h1>
            <p className="text-gray-600 mb-16">Collected essays, notes, and experiments.</p>

            {loading ? (
                <p className="text-gray-400 text-sm">Loading notes...</p>
            ) : (
                <div className="space-y-16">
                    {renderGroups.map((group) => (
                        <div key={group.month}>
                            <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-6">
                                {group.month}
                            </h2>
                            <div className="space-y-8">
                                {group.items.map((post) => (
                                    <div key={post.slug} className="group">
                                        <Link to={`/writings/${post.slug}`} className="text-blue-600 hover:underline block text-lg mb-1 font-medium">
                                            {post.title}
                                        </Link>
                                        {post.description && (
                                            <p className="text-gray-500 text-sm mb-1">{post.description}</p>
                                        )}
                                        {/* Safely render the array length to avoid crashes */}
                                        <div className="text-xs text-gray-400 flex items-center gap-1">
                                            <span>♥</span>
                                            <span>{post.likes?.length || 0}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Pagination Footer */}
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
