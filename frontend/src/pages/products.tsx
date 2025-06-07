import { useEffect, useState } from "react";
import AddProductForm from "@/components/AddProductForm";
import { getProducts } from "@/services/productService";
import Navbar from "@/components/Navbar";
import EditProductInformationForm from "@/components/EditProductInformationForm";
import AddCategoryForm from "@/components/AddCategoryForm";
import DeleteProduct from "@/components/DeleteProduct";
import Modal from "@/components/ModalForm";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

type Product = {
  id: number;
  name: string;
  quantity: number;
  category_id: number;
  price: number;
};

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleFormSuccess = () => {
    setShowForm(false);
    getProducts().then(setProducts); // Refresh products list
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowEditForm(true);
    setShowForm(false);
    setShowDeleteForm(false);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteForm(true);
    setShowForm(false);
    setShowEditForm(false);
  };

  const handleCategorySuccess = () => {
    setShowAddCategoryForm(false);
    // Refresh categories if needed
  };

  return (
    <div className="flex">
      <Navbar />
      <main className="ml-40 w-full p-8">
        <div className="container mx-auto px-4 pt-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Product List 🧾</h2>
            <div className="space-x-4">
              <button
                onClick={() => {
                  setShowForm((prev) => !prev);
                  setShowEditForm(false);
                  setShowDeleteForm(false);
                  setShowAddCategoryForm(false);
                  setSelectedProduct(null);
                }}
                className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600"
              >
                {showForm ? "Cancel" : "Add Product"}
              </button>

              <button
                onClick={() => {
                  setShowAddCategoryForm((prev) => !prev);
                  setShowForm(false);
                  setShowEditForm(false);
                  setShowDeleteForm(false);
                  setSelectedProduct(null);
                }}
                className="bg-green-500 text-white rounded-lg px-6 py-2 hover:bg-green-600"
              >
                {showAddCategoryForm ? "Cancel" : "Add Category"}
              </button>
            </div>
          </div>

          {/* Forms Section */}
          <div className="mb-6">
            {showForm && <AddProductForm onSuccess={handleFormSuccess} />}
            {showAddCategoryForm && (
              <AddCategoryForm onSuccess={handleCategorySuccess} />
            )}
          </div>

          {/* Edit Modal */}
          <Modal
            isOpen={showEditForm}
            onClose={() => {
              setShowEditForm(false);
              setSelectedProduct(null);
            }}
            title={`Edit Product: ${selectedProduct?.name}`}
          >
            {selectedProduct && (
              <EditProductInformationForm
                product={selectedProduct}
                onSuccess={() => {
                  setShowEditForm(false);
                  setSelectedProduct(null);
                  getProducts().then(setProducts);
                }}
              />
            )}
          </Modal>

          {/* Delete Modal */}
          <Modal
            isOpen={showDeleteForm}
            onClose={() => {
              setShowDeleteForm(false);
              setSelectedProduct(null);
            }}
            title="Delete Product"
          >
            {selectedProduct && (
              <DeleteProduct
                product={selectedProduct}
                onSuccess={() => {
                  setShowDeleteForm(false);
                  setSelectedProduct(null);
                  getProducts().then(setProducts);
                }}
              />
            )}
          </Modal>

          {/* Product List with inline actions */}
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead className="bg-gray-50 rounded-lg">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="text-black px-6 py-4">{p.name}</td>
                    <td className="text-black px-6 py-4">
                      {p.quantity === 0 ? (
                        <span className="text-red-500">Out of Stock</span>
                      ) : (
                        p.quantity
                      )}
                    </td>
                    <td className="text-black px-6 py-4">{p.price}</td>
                    <td className="text-black px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(p)}
                        className="text-blue-600 hover:text-blue-900 mr-4 p-2 hover:bg-blue-50 rounded-full"
                        title="Edit product"
                      >
                        <FiEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full"
                        title="Delete product"
                      >
                        <BsTrash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
