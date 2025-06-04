import { useState, useEffect } from "react";
import { getCategory } from "@/services/categoryService";
import { updateProduct } from "@/services/productService";

type Product = {
  id: number;
  name: string;
  quantity: number;
  category_id: number;
  price: number;
};

type Category = {
  category_id: number;
  category_name: string;
};

type Props = {
  product: Product;
  onSuccess: () => void;
};

export default function EditProductInformationForm({
  product,
  onSuccess,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    name: product.name,
    quantity: product.quantity,
    category_id: product.category_id,
    price: product.price,
  });

  useEffect(() => {
    getCategory().then(setCategories);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "category_id" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProduct(product.id, {
        name: form.name,
        quantity: Number(form.quantity),
        category_id: form.category_id,
        price: form.price,
      });
      alert("อัพเดทข้อมูลสินค้าสำเร็จ 🎉");
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("อัพเดทข้อมูลสินค้าไม่สำเร็จ");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl mb-4 text-black">Edit: {product.name}</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-black mb-1">Name</h3>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            placeholder="Product name"
            required
          />
        </div>

        <div>
          <h3 className="text-black mb-1">Quantity</h3>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            placeholder="Quantity"
            required
          />
        </div>

        <div>
          <h3 className="text-black mb-1">Price</h3>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            placeholder="Price"
            required
          />
        </div>

        <div>
          <h3 className="text-black mb-1">Category</h3>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Update Product
        </button>
      </div>
    </form>
  );
}
