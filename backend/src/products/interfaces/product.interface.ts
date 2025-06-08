export interface Product {
  id: number;
  name: string;
  quantity: number;
  category_id: number;
  price: number;
  image_url?: string;
  link?: string;
}
