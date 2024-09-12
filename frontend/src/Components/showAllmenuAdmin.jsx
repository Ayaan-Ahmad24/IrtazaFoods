import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const AdminMenuListPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/menu/get`
        );
        if (Array.isArray(response.data)) {
          setMenuItems(response.data);
          console.log("Menu items fetched successfully");
        } else {
          console.error(
            "Unexpected data format for menu items:",
            response.data
          );
          setMenuItems([]);
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setMenuItems([]);
      }
      setIsLoading(false);
    };

    fetchMenuItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/menu/${id}`);
      setMenuItems(menuItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-menu-item/${id}`);
  };

  return (
    <div className="flex mt-32">
      {/* Admin Side Panel */}
      <div className="w-64 bg-yellow-100 p-4 shadow-lg fixed h-full">
        <h2 className="text-xl font-bold mb-4">Welcome, Admin</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => navigate("/admin/add-menu-item")}
              className="w-full bg-yellow-300 p-2 rounded-md hover:bg-yellow-400 transition"
            >
              Add Menu Item
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/admin/add-blog")}
              className="w-full bg-yellow-300 p-2 rounded-md hover:bg-yellow-400 transition"
            >
              Add Blog Post
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/admin/show-all-blogs")}
              className="w-full bg-yellow-300 p-2 rounded-md hover:bg-yellow-400 transition"
            >
              Manage Blogs
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/admin/show-all-menu-items")}
              className="w-full bg-yellow-300 p-2 rounded-md hover:bg-yellow-400 transition"
            >
              Manage Menu Items
            </button>
          </li>
        </ul>
      </div>

      {/* Menu Items List */}
      <div className="flex-1 bg-white text-black font-sans ml-64">
        <section className="container mx-auto py-10 px-4" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-6 text-yellow-600 text-center">
            Menu Item List
          </h2>
          {isLoading ? (
            <div className="text-center">Loading menu items...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {menuItems.length ? (
                menuItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-yellow-100 shadow-2xl rounded-lg p-6 flex flex-col justify-between"
                    style={{
                      height: "400px", // Adjusted height for vertical rectangle shape
                      padding: "20px",
                      border: "2px solid #f1c40f",
                      borderRadius: "15px",
                    }}
                    data-aos="fade-up"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-56 object-cover rounded-md mb-4" // Increased height and decreased width proportionally
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-yellow-600">
                        {item.name}
                      </h3>
                      <p className="text-yellow-600 mt-2">₨{item.price}</p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(item._id)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">No menu items available.</div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminMenuListPage;
