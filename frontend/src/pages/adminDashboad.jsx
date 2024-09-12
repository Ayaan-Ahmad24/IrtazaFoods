import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Outlet } from 'react-router-dom';
import AddMenuItemPage from '../Components/addMenuitem';
import AddBlogPage from '../Components/addBlogPage';
import EditBlogPage from '../Components/EditBlog';
import EditMenuItemPage from '../Components/EditMenuItemPage';
import ShowAllBlogsAdminPage from '../Components/showAllblogsadmin';
import ShowAllMenuItemsAdminPage from '../Components/showAllmenuAdmin';
import AdminDashboardHome from '../pages/AdminDashboardHome';

const AdminDashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if admin is logged in
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/'); // Redirect to home if not logged in
        } else {
            setIsLoggedIn(true);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex mt-32">
            {/* Side Panel */}
            {isLoggedIn && (
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
            )}

            {/* Main Content */}
            <div className="flex-1 ml-64 p-6 mt-32">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-yellow-600">Admin Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Render specific component based on route */}
                    <Routes>
                        <Route path="/" element={<AdminDashboardHome />} />
                        <Route path="add-menu" element={<AddMenuItemPage />} />
                        <Route path="add-blog" element={<AddBlogPage />} />
                        <Route path="manage-blogs" element={<ShowAllBlogsAdminPage />} />
                        <Route path="manage-menu" element={<ShowAllMenuItemsAdminPage />} />
                        <Route path="edit-blog/:id" element={<EditBlogPage />} />
                        <Route path="edit-menu/:id" element={<EditMenuItemPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
