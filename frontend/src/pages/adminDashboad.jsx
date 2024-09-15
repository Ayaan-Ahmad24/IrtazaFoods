import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import AddMenuItemPage from '../Components/addMenuitem';
import AddBlogPage from '../Components/addBlogPage';
import EditBlogPage from '../Components/EditBlog';
import EditMenuItemPage from '../Components/EditMenuItemPage';
import ShowAllBlogsAdminPage from '../Components/showAllblogsadmin';
import ShowAllMenuItemsAdminPage from '../Components/showAllmenuAdmin';
import AdminDashboardHome from '../pages/AdminDashboardHome';
import SidePanel from "../Components/Sidepanel";

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
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row overflow-x-hidden">
            {/* Side Panel */}
            {isLoggedIn && (
                <SidePanel className="hidden md:block" />
            )}

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-6 mt-8 md:mt-32 ml-0 md:ml-[7rem]">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg h-full mt-32 md:mt-0">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-yellow-600 mb-4 md:mb-0">Admin Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 md:px-6 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
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
