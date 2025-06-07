import { useState } from "react";
import { createCategory } from "@/services/categoryService";

type Props = {
  onSuccess: () => void;
};

export default function AddCategoryForm({ onSuccess }: Props) {
  const [form, setForm] = useState({
    category_name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory(form);
      alert("Category added successfully 🎉");
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to add category");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl mb-4 text-black">Add New Category</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-black mb-1">Category Name</label>
          <input
            type="text"
            value={form.category_name}
            onChange={(e) => setForm({ category_name: e.target.value })}
            className="w-full p-2 border rounded text-black"
            placeholder="Enter category name"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Category
        </button>
      </div>
    </form>
  );
}
