import { useState, useEffect } from "react";
import { createProduct } from "@/services/productService";
import { getCategory } from "@/services/categoryService";

type Product = {
  name: string;
  quantity: number;
  category_id: number;
  price: number;
};

type Category = {
  category_id: number;
  category_name: string;
};

export default function AddProductForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [form, setForm] = useState<Product>({
    name: "",
    quantity: 0,
    category_id: 0,
    price: 0,
  });

  const [category, setcategory] = useState<Category[]>([]);

  useEffect(() => {
    getCategory().then((data) => {
      // console.log("🎯 category:", data);
      setcategory(data);
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "category_id"
          ? parseInt(value, 10) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || form.quantity <= 0 || form.category_id <= 0) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const res = await createProduct(form);
      alert("เพิ่มสินค้าสำเร็จ 🎉");
      setForm({ name: "", quantity: 0, category_id: 0, price: 0 });
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("เพิ่มสินค้าไม่สำเร็จ");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white text-black rounded-lg p-4 m-4 ">
        <h2>Add Product</h2>
        <div className="[&>input]:p-2 [&>select]:p-2 [&>input]:m-1 [&>select]:m-1">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={form.name}
            placeholder="Product Name"
            required
            className="border-gray-3w00 border-solid border-2 rounded-lg"
          />

          <input
            type="number"
            name="quantity"
            onChange={handleChange}
            placeholder="Quantity"
            value={form.quantity}
            required
            className="border-gray-300 border-solid border-2 rounded-lg"
          />

          <input
            type="number"
            name="price"
            onChange={handleChange}
            placeholder="Price"
            value={form.price}
            required
            className="border-gray-300 border-solid border-2 rounded-lg"
          />

          <select
            name="category_id"
            value={form.category_id.toString()}
            onChange={handleChange}
            required
            className="border-gray-300 border-solid border-2 rounded-lg"
          >
            <option value="0">Select Category</option>
            {category.map((c) => (
              <option key={c.category_id} value={c.category_id.toString()}>
                {c.category_name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="border-gray-300 border-solid border-2 rounded-lg p-1.5"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
