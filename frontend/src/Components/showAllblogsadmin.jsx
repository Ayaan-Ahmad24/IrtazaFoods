import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import SidePanel from "./Sidepanel";

const AdminBlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });

    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/blog/get-blog`
        );
        if (Array.isArray(response.data)) {
          setBlogs(response.data);
          console.log("Blogs fetched successfully");
        } else {
          console.error("Unexpected data format for blogs:", response.data);
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      }
      setIsLoading(false);
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/blog/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-blog/${id}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Admin Side Panel */}
      <SidePanel />
      {/* Blog Items List */}
      <div className="flex-1 bg-white text-black font-sans md:ml-[7rem] mt-12 md:mt-32 px-4">
        <section className="container mx-auto py-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-600 text-center">
            Blog List
          </h2>
          {isLoading ? (
            <div className="text-center">Loading blogs...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.length ? (
                blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="bg-yellow-100 shadow-2xl rounded-lg p-4 flex flex-col justify-between"
                    style={{
                      height: "auto", // Adjust height as needed
                      border: "2px solid #f1c40f",
                      borderRadius: "15px",
                    }}
                    data-aos="fade-up"
                  >
                    {blog.image && (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-40 object-cover rounded-md mb-4"
                      />
                    )}
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-yellow-600">
                        {blog.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-700 mt-2">
                        {blog.content.substring(0, 100)}...
                      </p>
                    </div>
                    <a
                      href={`/blog/${blog._id}`}
                      className="text-yellow-500 hover:underline mt-4 block"
                    >
                      Read More
                    </a>
                    <div className="mt-4 flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0">
                      <button
                        onClick={() => handleEdit(blog._id)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">No blogs available.</div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminBlogListPage;
