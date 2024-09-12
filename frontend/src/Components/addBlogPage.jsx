import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'size': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet',
    'link', 'image'
];

const AddBlogPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (newBlog) => {
            try {
                const response = await axios.post('http://localhost:5000/api/blog/add-blog', newBlog, {
                    headers: { 'Content-Type': 'application/json' }
                });
                return response.data;
            } catch (error) {
                console.error('Error adding blog:', error);
                throw error;
            }
        },
        onSuccess: () => {
            alert('Blog post added successfully');
            navigate('/admin/show-all-blogs');
        },
        onError: () => {
            alert('Failed to add blog post');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({
            title,
            content,
            author,
            image,
            tags: tags.split(',').map(tag => tag.trim())
        });
    };

    return (
        <div className="flex mt-32">
            {/* Admin Side Panel */}
            <div className="w-64 bg-yellow-100 p-4 shadow-lg fixed h-full">
                <h2 className="text-xl font-bold mb-4">Welcome, Admin</h2>
                <ul className="space-y-4">
                    <li>
                        <button
                            onClick={() => navigate('/admin/add-menu-item')}
                            className="w-full bg-yellow-300 p-2 rounded-md hover:bg-yellow-400 transition"
                        >
                            Add Menu Item
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/admin/add-blog')}
                            className="w-full bg-yellow-300 p-2 rounded-md hover:bg-yellow-400 transition"
                        >
                            Add Blog Post
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/admin/show-all-blogs')}
                            className="w-full bg-yellow-300 p-2 rounded-md hover:bg-yellow-400 transition"
                        >
                            Manage Blogs
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/admin/show-all-menu-items')}
                            className="w-full bg-yellow-300 p-2 rounded-md hover:bg-yellow-400 transition"
                        >
                            Manage Menu Items
                        </button>
                    </li>
                </ul>
            </div>

            {/* Add Blog Form */}
            <div className="flex-1 bg-gray-100 min-h-screen py-12 px-4 flex justify-center ml-64">
                <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-yellow-600 mb-6">Add Blog Post</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="content" className="block text-lg font-medium text-gray-700">Content</label>
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={modules}
                                formats={formats}
                                className="mt-1 block w-full h-96 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                                style={{ minHeight: '300px' }}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="author" className="block text-lg font-medium text-gray-700">Author</label>
                            <input
                                type="text"
                                id="author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="image" className="block text-lg font-medium text-gray-700">Image URL</label>
                            <input
                                type="text"
                                id="image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="tags" className="block text-lg font-medium text-gray-700">Tags (comma-separated)</label>
                            <input
                                type="text"
                                id="tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={mutation.isLoading}
                            className="bg-yellow-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                        >
                            {mutation.isLoading ? 'Adding...' : 'Add Blog Post'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBlogPage;
