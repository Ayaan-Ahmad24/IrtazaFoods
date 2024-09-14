import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const SidePanel = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidePanel = () => {
        setIsOpen(!isOpen);
    };

    // Function to handle swipe gestures
    const handleTouchStart = (e) => {
        const touchStartX = e.touches[0].clientX;
        e.target.setAttribute('data-touch-start-x', touchStartX);
    };

    const handleTouchEnd = (e) => {
        const touchStartX = parseFloat(e.target.getAttribute('data-touch-start-x'));
        const touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;

        if (swipeDistance > 50) {
            setIsOpen(true); // Swipe right to open
        } else if (swipeDistance < -50) {
            setIsOpen(false); // Swipe left to close
        }
    };

    return (
        <>
            {/* Button to open the panel, visible on mobile only */}
            <button
                className="fixed top-1/2 left-2 transform -translate-y-1/2 text-yellow-500 text-3xl md:hidden z-40"
                onClick={toggleSidePanel}
            >
                {isOpen ? <FaArrowLeft /> : <FaArrowRight />} {/* Arrow icon */}
            </button>

            {/* Mobile side panel, visible when isOpen is true */}
            <div
                className={`fixed top-0 left-0 min-h-full w-64 bg-yellow-100 shadow-lg p-4 z-30 transition-transform transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:hidden overflow-y-auto`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <button
                    className="text-2xl text-yellow-500 mb-6"
                    onClick={toggleSidePanel}
                >
                    <FaArrowLeft /> {/* Close panel icon */}
                </button>
                <h2 className="text-xl font-bold mb-4">Welcome, Admin</h2>
                <ul className="space-y-4">
                    <li>
                        <Link
                            to="/admin/dashboard"
                            className="block w-full bg-yellow-300 p-2 rounded-md text-center hover:bg-yellow-400 transition"
                            onClick={toggleSidePanel}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/add-menu-item"
                            className="block w-full bg-yellow-300 p-2 rounded-md text-center hover:bg-yellow-400 transition"
                            onClick={toggleSidePanel}
                        >
                            Add Menu Item
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/add-blog"
                            className="block w-full bg-yellow-300 p-2 rounded-md text-center hover:bg-yellow-400 transition"
                            onClick={toggleSidePanel}
                        >
                            Add Blog Post
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/show-all-blogs"
                            className="block w-full bg-yellow-300 p-2 rounded-md text-center hover:bg-yellow-400 transition"
                            onClick={toggleSidePanel}
                        >
                            Manage Blogs
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/show-all-menu-items"
                            className="block w-full bg-yellow-300 p-2 rounded-md text-center hover:bg-yellow-400 transition"
                            onClick={toggleSidePanel}
                        >
                            Manage Menu Items
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Desktop side panel */}
            <div className="hidden md:block top-0 left-0 min-h-[900px] w-64 bg-yellow-100 shadow-lg p-4 z-10 mt-32 overflow-y-auto">
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
        </>
    );
};

export default SidePanel;
