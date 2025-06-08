export class CreateProductDto {
  name: string;
  quantity: number;
  category_id: number;
  price: number;
  link?: string;
  image_url?: string;
  created_at: string;
}
