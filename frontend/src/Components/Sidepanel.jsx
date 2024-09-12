import React from 'react';
import { Link } from 'react-router-dom';

const SidePanel = () => {
    return (
        <div className="w-64 bg-yellow-100 p-4 shadow-lg fixed h-full mt-32">
            <h2 className="text-xl font-bold mb-4">Welcome, Admin</h2>
            <ul className="space-y-4">
                <li>
                    <Link
                        to="/admin/dashboard"
                        className="block w-full bg-yellow-300 p-2 rounded-md text-center hover:bg-yellow-400 transition"
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/add-menu-item"
                        className="block w-full bg-yellow-300 p-2 rounded-md text-center hover:bg-yellow-400 transition"
                    >
                        Add Menu Item
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/add-blog"
                        className="block w-full bg-yellow-300 p-2 rounded-md text-center hover:bg-yellow-400 transition"
                    >
                        Add Blog Post
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/show-all-blogs"
                        className="block w-full bg-yellow-300 p-2 rounded-md text-center hover:bg-yellow-400 transition"
                    >
                        Manage Blogs
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/show-all-menu-items"
                        className="block w-full bg-yellow-300 p-2 rounded-md text-center hover:bg-yellow-400 transition"
                    >
                        Manage Menu Items
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SidePanel;
