import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "@/services/productService";

type Product = {
  id: number;
  name: string;
  quantity: number;
  category_id: number;
  price: number;
  image_url?: string;
  link?: string;
};

type Props = {
  product: Product;
  onSuccess: () => void;
};

export default function DeleteProduct({ product, onSuccess }: Props) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm(`Are you sure you want to delete ${product.name}?`)) {
      return;
    }

    try {
      await deleteProduct(product.id);
      alert("ลบสินค้าสำเร็จ 🎉");
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("ลบสินค้าไม่สำเร็จ");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded p-2">
      {/* <h2 className="text-xl font-semibold mb-4 text-black">Delete Product</h2> */}
      <p className="text-gray-600 mb-4">
        Are you sure you want to delete: <strong>{product.name}</strong>?
      </p>
      <button
        type="submit"
        className="w-full bg-red-500 text-white rounded-lg px-6 py-2 hover:bg-red-600"
      >
        Delete
      </button>
    </form>
  );
}
