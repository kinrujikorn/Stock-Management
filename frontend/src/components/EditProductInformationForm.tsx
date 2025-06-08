import { useState, useEffect } from "react";
import { getCategory } from "@/services/categoryService";
import { updateProduct } from "@/services/productService";
import { uploadImage } from "@/services/uploadService";

type Product = {
  id: number;
  name: string;
  quantity: number;
  category_id: number;
  price: number;
  image_url?: string;
  link?: string;
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
    image: null as File | null,
    image_url: product.image_url || "",
    link: product.link,
  });

  const [imagePreview, setImagePreview] = useState<string>(
    product.image_url || ""
  );

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
      let image_url = form.image_url;
      if (form.image) {
        // Upload new image if one was selected
        image_url = await uploadImage(form.image);
      }

      await updateProduct(product.id, {
        name: form.name,
        quantity: Number(form.quantity),
        category_id: form.category_id,
        price: Number(form.price),
        image_url,
        link: form.link,
      });

      alert("อัพเดทข้อมูลสินค้าสำเร็จ 🎉");
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("อัพเดทข้อมูลสินค้าไม่สำเร็จ");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white  rounded p-2">
      {/* <h2 className="text-xl mb-4 text-black font-semibold">
        Edit: {product.name}
      </h2> */}
      <div className="space-y-4">
        <div className="relative">
          <h3 className="text-black mb-1">Product Image</h3>
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
              <p>Click to upload new image</p>
              <p>JPG, PNG up to 5MB</p>
            </div>
          </div>
        </div>
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

        <div>
          <h3 className="text-black mb-1">Link</h3>
          <input
            type="text"
            name="link"
            value={form.link}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            placeholder="Link"
          />
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
