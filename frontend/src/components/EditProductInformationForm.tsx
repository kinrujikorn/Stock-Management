import { useState, useEffect } from "react";
import { getCategory } from "@/services/categoryService";
import { getProducts, updateProduct } from "@/services/productService";

type Product = {
  id: number;
  name: string;
  quantity: number;
  category_id: number;
};

type Category = {
  category_id: number;
  category_name: string;
};

type Props = {
  onSuccess: () => void;
};

export default function EditProductInformationForm({ onSuccess }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    category_id: 0,
  });

  useEffect(() => {
    getProducts().then(setProducts);
    getCategory().then(setCategories);
  }, []);

  const handleProductSelect = (productId: string) => {
    const product = products.find((p) => p.id === parseInt(productId));
    if (product) {
      setSelectedProduct(product);
      setForm({
        name: product.name,
        quantity: product.quantity,
        category_id: product.category_id,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct) {
      alert("Please select a product to update");
      return;
    }

    try {
      const res = await updateProduct(selectedProduct.id, {
        name: form.name,
        quantity: form.quantity,
        category_id: form.category_id,
      });
      alert("อัพเดทข้อมูลสินค้าสำเร็จ 🎉");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("อัพเดทข้อมูลสินค้าไม่สำเร็จ");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 ">
      <h2 className="text-xl  mb-4 text-black">Edit Product Information</h2>
      <h3 className="text-black">Selected</h3>
      <div className="mb-4">
        <select
          className="w-full p-2 border rounded text-black"
          onChange={(e) => handleProductSelect(e.target.value)}
          value={selectedProduct?.id || ""}
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        {selectedProduct && (
          <div className="mt-4">
            <h3 className="text-black">Name</h3>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2 text-black"
              placeholder="Product name"
            />
            <h3 className="text-black">Quantity</h3>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2 text-black"
              placeholder="Quantity"
            />
            <h3 className="text-black">Category</h3>
            <select
              name="category_id"
              value={form.category_id}
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  category_id: parseInt(e.target.value),
                }));
              }}
              className="w-full p-2 border rounded text-black mb-2"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Update Product
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
