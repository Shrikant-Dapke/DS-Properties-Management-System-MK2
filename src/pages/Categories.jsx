import { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingCategory) {
        response = await fetch(
          `http://localhost:5000/categories/${editingCategory.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );

        const updatedCategory = await response.json();

        setCategories(
          categories.map((category) =>
            category.id === updatedCategory.id ? updatedCategory : category,
          ),
        );
      } else {
        response = await fetch("http://localhost:5000/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const newCategory = await response.json();

        setCategories([...categories, newCategory]);
      }

      setFormData({
        name: "",
      });

      setEditingCategory(null);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this category?");

    if (!confirmed) return;

    try {
      await fetch(`http://localhost:5000/categories/${id}`, {
        method: "DELETE",
      });

      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <PageHeader
        title="Categories"
        buttonText="+ Add Categories"
        onButtonClick={() => setShowModal(true)}
      />

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="text-left py-3">Category Name</th>
              <th className="text-left py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-slate-800">
                <td className="py-4">{category.name}</td>

                <td className="py-4">
                  <button
                    onClick={() => {
                      setEditingCategory(category);

                      setFormData({
                        name: category.name,
                      });

                      setShowModal(true);
                    }}
                    className="bg-yellow-600 px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-slate-900 p-6 rounded-xl w-[450px]">
            <h2 className="text-2xl font-bold mb-6">
              {editingCategory ? "Edit Category" : "Add Category"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                className="w-full p-3 rounded bg-slate-800"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCategory(null);
                    setFormData({
                      name: "",
                    });
                  }}
                  className="bg-slate-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button type="submit" className="bg-blue-600 px-4 py-2 rounded">
                  {editingCategory ? "Update Category" : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
