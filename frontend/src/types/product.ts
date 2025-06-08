export type Product = {
  id: number;
  name: string;
  quantity: number;
  category_id: number;
  image_url?: string | null;
  price: number;
  link?: string; // Optional link to product details
  created_at: string;
};
