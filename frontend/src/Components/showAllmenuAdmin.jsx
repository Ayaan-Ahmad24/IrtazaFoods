import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import SidePanel from "./Sidepanel";

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
          console.error("Unexpected data format for menu items:", response.data);
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
    <div className="flex flex-col md:flex-row">
      {/* Admin Side Panel */}
      <SidePanel />
      {/* Menu Items List */}
      <div className="flex-1 bg-white text-black font-sans mt-12 md:mt-32 px-4 md:px-8">
        <section className="container mx-auto py-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-600 text-center">
            Menu Item List
          </h2>
          {isLoading ? (
            <div className="text-center">Loading menu items...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.length ? (
                menuItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-yellow-100 shadow-2xl rounded-lg p-4 flex flex-col justify-between"
                    style={{
                      height: "auto", // Adjust height as needed
                      border: "2px solid #f1c40f",
                      borderRadius: "15px",
                    }}
                    data-aos="fade-up"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-40 object-cover rounded-md mb-4"
                      />
                    )}
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-yellow-600">
                        {item.name}
                      </h3>
                      <p className="text-yellow-600 mt-2">₨{item.price}</p>
                    </div>
                    <div className="mt-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
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
