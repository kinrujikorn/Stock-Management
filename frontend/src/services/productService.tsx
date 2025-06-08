const API_URL = "http://localhost:3000/products";

export const getProducts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("โหลดสินค้าไม่สำเร็จ");
  return res.json();
};

export const createProduct = async (product: {
  name: string;
  quantity: number;
  category_id: number;
  price: number;
  image_url?: string;
  link?: string;
  created_at: string;
}) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("เพิ่มสินค้าไม่สำเร็จ");
  return res.json();
};

export const updateProduct = async (
  id: number,
  data: {
    name: string;
    quantity: number;
    category_id: number;
    price: number;
    image_url?: string;
    link?: string;
  }
) => {
  const response = await fetch(`http://localhost:3000/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
};

export const deleteProduct = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
};
