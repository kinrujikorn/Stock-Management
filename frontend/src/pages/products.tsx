import { useEffect, useState } from "react";
import AddProductForm from "@/components/AddProductForm";
import { getProducts } from "@/services/productService";
import Navbar from "@/components/Navbar";
import EditProductInformationForm from "@/components/EditProductInformationForm";
import DeleteProduct from "@/components/DeleteProduct";

type Product = {
  id: string;
  name: string;
  quantity: number;
  category_id: number;
};

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleFormSuccess = () => {
    setShowForm(false);
    getProducts().then(setProducts); // Refresh products list
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center pt-20">
        <div className="pb-10 px-4">
          <h2 className="text-2xl font-bold">🧾 Product List</h2>
          <ul>
            {products.map((p) => (
              <li key={p.id}>
                {p.name} (จำนวน: {p.quantity})
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        {showForm && <AddProductForm onSuccess={handleFormSuccess} />}
        <button
          onClick={() => {
            setShowForm((prev) => !prev);
            if (showEditForm) setShowEditForm(false);
            if (showDeleteForm) setShowDeleteForm(false);
          }}
          className="bg-white text-black rounded-lg px-6 py-2 m-4 w-26" // Fixed width and padding
        >
          {showForm ? "Cancel" : "➕ Add"}
        </button>
      </div>

      {/* Edit Form Section */}
      <div className="flex justify-center">
        {!showForm && (
          <>
            {showEditForm && (
              <EditProductInformationForm
                onSuccess={() => {
                  setShowEditForm(false);
                  getProducts().then(setProducts);
                }}
              />
            )}
            <button
              onClick={() => {
                setShowEditForm((prev) => !prev);
                if (showDeleteForm) setShowDeleteForm(false);
              }}
              className="bg-white text-black rounded-lg px-6 py-2 m-4 w-24" // Fixed width and padding
            >
              {showEditForm ? "Cancel" : "Edit"}
            </button>
          </>
        )}
      </div>

      {/* Delete Form Section */}
      <div className="flex justify-center">
        {!showForm && (
          <>
            {showDeleteForm && (
              <DeleteProduct
                onSuccess={() => {
                  setShowDeleteForm(false);
                  getProducts().then(setProducts);
                }}
              />
            )}
            <button
              onClick={() => {
                setShowDeleteForm((prev) => !prev);
                if (showEditForm) setShowEditForm(false);
              }}
              className="bg-white text-black rounded-lg px-6 py-2 m-4 w-24" // Fixed width and padding
            >
              {showDeleteForm ? "Cancel" : "Delete"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
