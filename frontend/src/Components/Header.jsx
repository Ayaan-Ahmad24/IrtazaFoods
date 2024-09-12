import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaSearch, FaUserCircle } from 'react-icons/fa';
import "../index.css"; // Ensure Tailwind CSS is correctly imported

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if admin is logged in initially
        const token = localStorage.getItem('adminToken');
        setIsAdminLoggedIn(!!token);

        // Listen for changes in localStorage
        const handleStorageChange = () => {
            const token = localStorage.getItem('adminToken');
            setIsAdminLoggedIn(!!token);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleLogin = () => {
        navigate("/admin/login"); // Redirect to the admin login page
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleAdminDashboard = () => {
        navigate("/admin/dashboard"); // Redirect to the admin dashboard
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsAdminLoggedIn(false);
        navigate("/"); // Redirect to the homepage after logout
    };

    return (
        <header className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-md py-4 fixed top-0 w-full left-0 right-0 z-50">
            <nav className="container mx-auto flex justify-between items-center px-4 md:px-6">
                <div className="text-3xl font-extrabold">
                    <Link to="/">
                        <img
                            src="https://res.cloudinary.com/duvlkyzij/image/upload/v1725890201/Copy_of_chef__3_-removebg-preview_cgzkd9.png"
                            alt="Logo"
                            className="h-20 w-auto"
                        />
                    </Link>
                </div>

                {/* Search Bar (Desktop) */}
                <form onSubmit={handleSearch} className="flex flex-1 max-w-md ml-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="flex-grow p-2 border border-gray-300 rounded-l-lg"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-yellow-700 p-2 rounded-r-lg hover:bg-yellow-800 transition-colors duration-300"
                    >
                        Search
                    </button>
                </form>

                <ul className="hidden md:flex space-x-6 text-lg pr-6">
                    <li>
                        <Link to="/" className="hover:text-gray-800 transition">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/menu" className="hover:text-gray-800 transition">
                            Menu
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-gray-700">
                            ContactUs
                        </Link>
                    </li>
                    <li>
                        <Link to="/blogs" className="hover:text-gray-800 transition">
                            Blogs
                        </Link>
                    </li>
                </ul>

                <div className="flex items-center space-x-4 md:space-x-6">
                    {!isAdminLoggedIn ? (
                        <button
                            onClick={handleLogin}
                            className="bg-black text-white px-6 py-3 rounded-full shadow-md hover:bg-gray-800 focus:outline-none transition mr-4"
                        >
                            Login
                        </button>
                    ) : (
                        <FaUserCircle
                            className="text-3xl cursor-pointer hover:text-gray-800 transition"
                            onClick={togglePopup}
                        />
                    )}

                    <div className="md:hidden">
                        <FaBars
                            className="text-2xl cursor-pointer"
                            onClick={toggleDrawer}
                        />
                    </div>
                </div>
            </nav>

            {/* Slide Drawer for mobile */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-yellow-500 shadow-lg transform ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out`}
            >
                <button className="text-2xl p-4" onClick={toggleDrawer}>
                    ✕
                </button>
                <div className="flex items-center p-4 border-b border-gray-300">
                    <input
                        type="text"
                        placeholder="Search blogs or menu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-2 border-gray-300 rounded-md p-2 w-full"
                    />
                    <FaSearch
                        className="text-2xl cursor-pointer ml-2"
                        onClick={handleSearch}
                    />
                </div>
                <ul className="flex flex-col items-start p-4 space-y-4 text-lg">
                    <li>
                        <Link to="/" className="hover:text-gray-700" onClick={toggleDrawer}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/menu" className="hover:text-gray-700" onClick={toggleDrawer}>
                            Menu
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-gray-700" onClick={toggleDrawer}>
                            ContactUs
                        </Link>
                    </li>
                    <li>
                        <Link to="/blogs" className="hover:text-gray-700" onClick={toggleDrawer}>
                            Blogs
                        </Link>
                    </li>
                    
                    {isAdminLoggedIn && (
                        <>
                            <li>
                                <Link
                                    to="/admin/dashboard"
                                    className="hover:text-gray-700"
                                    onClick={toggleDrawer}
                                >
                                    Admin Dashboard
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Popup for Admin User */}
            {isPopupOpen && isAdminLoggedIn && (
                <div className="fixed top-14 right-4 bg-white border border-gray-300 shadow-lg rounded-lg p-4 z-50">
                    <h2 className="text-xl font-bold mb-2">Admin Options</h2>
                    <ul>
                        <li>
                            <button
                                onClick={handleAdminDashboard}
                                className="block w-full bg-yellow-300 p-2 rounded-md hover:bg-yellow-400 transition mb-2"
                            >
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="block w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
