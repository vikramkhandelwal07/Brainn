import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { categoryEndpoints } from "../services/api";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiConnector("GET", categoryEndpoints.GET_ALL_CATEGORIES);
      if (response?.data?.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await apiConnector(
        "POST",
        categoryEndpoints.CREATE_CATEGORY,
        formData
      );
      if (response?.data?.success) {
        toast.success("Category created successfully");
        setFormData({ name: "", description: "" });
        fetchCategories();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      setLoading(true);
      const response = await apiConnector(
        "DELETE",
        categoryEndpoints.DELETE_CATEGORY + "/" + categoryId
      );
      if (response?.data?.success) {
        toast.success("Category deleted successfully");
        fetchCategories();
      }
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Category Management</h1>
      
      {/* Create Category Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Categories</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid gap-4">
            {categories.map((category) => (
              <div
                key={category._id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement; 