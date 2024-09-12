import React from 'react';

const AdminDashboardHome = () => {
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-yellow-600 mb-4">Welcome, Admin!</h1>
            <p className="text-lg text-gray-700 mb-6">
                Welcome to the Admin Dashboard of Irtazafoods. Here you can manage menu items, blog posts, and other important content for the website. Use the side panel to navigate between different sections, including adding new items and managing existing ones.
            </p>
            <p className="text-lg text-gray-700">
                If you have any questions or need assistance, feel free to reach out through the support channels.
            </p>
        </div>
    );
};

export default AdminDashboardHome;
