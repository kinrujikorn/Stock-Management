export class CreateProductDto {
  name: string;
  quantity: number;
  category_id: number;
  price: number;
  image_url?: string; // Make sure this is included
}
