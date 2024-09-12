// SingleBlogPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleBlogPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/blog/get/${id}`);
                if (response.data) {
                    setBlog(response.data);
                } else {
                    setError('Blog not found');
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
                setError('An error occurred while fetching the blog.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-red-600">{error}</p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl">Blog not found</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 mt-32">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-5xl font-bold text-yellow-600 mb-6">{blog.title}</h1>
                <div className="mb-6 text-gray-600">
                    <p className="text-lg">By {blog.author} | {new Date(blog.createdAt).toLocaleDateString()}</p>
                </div>
                {blog.image && (
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-80 object-cover rounded-lg mb-6"
                    />
                )}
                <div
                    className="prose lg:prose-xl"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
                {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Tags</h2>
                        <ul className="list-disc ml-6 mt-2 text-gray-600">
                            {blog.tags.map((tag, index) => (
                                <li key={index} className="text-lg">{tag}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleBlogPage;
