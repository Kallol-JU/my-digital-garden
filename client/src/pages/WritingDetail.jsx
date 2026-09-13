import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080/api';

// 1. Helper function to get or generate a unique ID for anonymous users
const getUserId = () => {
    let userId = localStorage.getItem('reader_id');
    if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem('reader_id', userId);
    }
    return userId;
};

export default function WritingDetail() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Fetch the ID when the component loads
    const userId = getUserId();

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
            // 2. Send the userId in the PUT request body
            const response = await axios.put(`${API_URL}/writings/${slug}/like`, { userId });
            
            // 3. Update the local React state based on the API response
            if (response.data.success) {
                setPost(prevPost => ({
                    ...prevPost,
                    likes: response.data.hasLiked 
                        ? [...(prevPost.likes || []), userId] // Add ID if liked
                        : (prevPost.likes || []).filter(id => id !== userId) // Remove ID if unliked
                }));
            }
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    if (loading) return <div className="animate-fade-in max-w-2xl text-gray-500">Loading note...</div>;
    if (!post) return <div className="animate-fade-in max-w-2xl text-gray-900">Note not found.</div>;

    // Check if this specific user has liked the post
    const hasLiked = post.likes?.includes(userId);

    return (
        <div className="animate-fade-in max-w-2xl">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">{post.title}</h1>
            {post.description && (
                <p className="text-gray-600 mb-4">{post.description}</p>
            )}

            <div className="mb-12">
                <button
                    onClick={handleLike}
                    // 4. Dynamic CSS changes the button color if they liked it
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm transition-colors ${
                        hasLiked 
                            ? 'border-red-400 text-red-500 bg-red-50' 
                            : 'border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                >
                    <span>{hasLiked ? '♥' : '♡'}</span>
                    {/* 5. Render the length of the array, not the array itself */}
                    <span>{post.likes?.length || 0}</span>
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
