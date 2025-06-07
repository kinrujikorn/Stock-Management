export type Product = {
  id: number;
  name: string;
  quantity: number;
  category_id: number;
  image_url?: string | null;
  price: number;
};
