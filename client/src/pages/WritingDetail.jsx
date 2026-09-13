import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080/api';

export default function WritingDetail() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${API_URL}/writings/${slug}`);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    const handleLike = async () => {
        try {
            const response = await axios.put(`${API_URL}/writings/${slug}/like`);
            setPost(response.data);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    if (loading) return <div className="animate-fade-in max-w-2xl text-gray-500">Loading note...</div>;
    if (!post) return <div className="animate-fade-in max-w-2xl text-gray-900">Note not found.</div>;

    return (
        <div className="animate-fade-in max-w-2xl">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">{post.title}</h1>
            {post.description && (
                <p className="text-gray-600 mb-4">{post.description}</p>
            )}

            <div className="mb-12">
                <button
                    onClick={handleLike}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-gray-400 transition-colors"
                >
                    <span>♥</span>
                    <span>{post.likes || 0}</span>
                </button>
            </div>

            <article className="prose prose-gray max-w-none text-gray-800 space-y-6 leading-relaxed [&>p]:mb-6 [&>blockquote]:border-l-2 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>

            <div className="mt-20 pt-8 border-t border-gray-100 text-sm text-center">
                <Link to="/writings" className="text-blue-600 hover:underline">
                    All writings
                </Link>
            </div>
        </div>
    );
}