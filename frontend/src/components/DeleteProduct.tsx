import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "@/services/productService";

type Product = {
  id: number;
  name: string;
  quantity: number;
  category_id: number;
};

type Props = {
  onSuccess: () => void;
};

export default function DeleteProduct({ onSuccess }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleProductSelect = (productId: string) => {
    const product = products.find((p) => p.id === parseInt(productId));
    setSelectedProduct(product || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct) {
      alert("Please select a product to delete");
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedProduct.name}?`)) {
      return;
    }

    try {
      await deleteProduct(selectedProduct.id);
      alert("ลบสินค้าสำเร็จ 🎉");
      setSelectedProduct(null);
      getProducts().then(setProducts); // Refresh the product list
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("ลบสินค้าไม่สำเร็จ");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-bold mb-4 text-black">Delete Product</h2>
      <div className="mb-4">
        <select
          className="w-full p-2 border rounded text-black mb-4"
          onChange={(e) => handleProductSelect(e.target.value)}
          value={selectedProduct?.id || ""}
        >
          <option value="">Select a product to delete</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (Quantity: {product.quantity})
            </option>
          ))}
        </select>

        {selectedProduct && (
          <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded">
            <p className="text-black mb-2">Selected product to delete:</p>
            <p className="text-red-600 font-bold">{selectedProduct.name}</p>
            <p className="text-red-600">Quantity: {selectedProduct.quantity}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!selectedProduct}
          className={`w-full p-2 rounded text-white ${
            selectedProduct
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Delete Product
        </button>
      </div>
    </form>
  );
}
