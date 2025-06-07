import { useState, useEffect } from "react";
import { createProduct } from "@/services/productService";
import { getCategory } from "@/services/categoryService";
import { uploadImage } from "../services/uploadService";

type Product = {
  name: string;
  quantity: number;
  category_id: number;
  price: number;
  image?: File | null;
  image_url?: string;
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
    image: null,
    image_url: "",
  });

  const [error, setErrors] = useState({
    name: "",
    quantity: "",
    category_id: "",
    price: "",
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

    // Only allow numbers for quantity and price
    if ((name === "quantity" || name === "price") && value !== "") {
      if (!/^\d+$/.test(value)) return;
    }

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "category_id" || name === "price"
          ? parseInt(value, 10) || 0
          : value,
    }));
  };

  const [imagePreview, setImagePreview] = useState<string>("");
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !form.name ? "กรุณากรอกชื่อสินค้า" : "",
      quantity: form.quantity <= 0 ? "กรุณากรอกจำนวนสินค้า" : "",
      price: form.price <= 0 ? "กรุณากรอกราคา" : "",
      category_id: form.category_id <= 0 ? "กรุณาเลือกหมวดหมู่สินค้า" : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      let image_url = "";
      if (form.image) {
        image_url = await uploadImage(form.image);
      }

      const productData = {
        ...form,
        image_url,
      };
      delete productData.image;

      const res = await createProduct(productData);
      alert("เพิ่มสินค้าสำเร็จ 🎉");
      setForm({ name: "", quantity: 0, category_id: 0, price: 0 });
      setErrors({ name: "", quantity: "", price: "", category_id: "" });
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("เพิ่มสินค้าไม่สำเร็จ");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white text-black rounded-lg p-4 m-4">
        <h2>Add Product</h2>

        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No image
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>Click to upload product image</p>
              <p>JPG, PNG up to 5MB</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4 mt-6">
          <div className="relative">
            {error.name && (
              <p className="absolute -top-5 left-0 text-red-500 text-sm">
                {error.name}
              </p>
            )}
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={form.name}
              placeholder="Product Name"
              className={`w-full p-2 border-solid border-2 rounded-lg ${
                error.name ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="relative">
            {error.quantity && (
              <p className="absolute -top-5 left-0 text-red-500 text-sm">
                {error.quantity}
              </p>
            )}
            <input
              type="text"
              name="quantity"
              onChange={handleChange}
              value={form.quantity}
              placeholder="Quantity"
              pattern="\d*"
              className={`w-full p-2 border-solid border-2 rounded-lg ${
                error.quantity ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="relative">
            {error.price && (
              <p className="absolute -top-5 left-0 text-red-500 text-sm">
                {error.price}
              </p>
            )}
            <input
              type="text"
              name="price"
              onChange={handleChange}
              value={form.price}
              placeholder="Price"
              pattern="\d*"
              className={`w-full p-2 border-solid border-2 rounded-lg ${
                error.price ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="relative">
            {error.category_id && (
              <p className="absolute -top-5 left-0 text-red-500 text-sm">
                {error.category_id}
              </p>
            )}
            <select
              name="category_id"
              value={form.category_id.toString()}
              onChange={handleChange}
              className={`w-full p-2 border-solid border-2 rounded-lg ${
                error.category_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="0">Select Category</option>
              {category.map((c) => (
                <option key={c.category_id} value={c.category_id.toString()}>
                  {c.category_name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="p-2 border-gray-300 border-solid border-2 rounded-lg hover:bg-gray-100"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
