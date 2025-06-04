type Product = {
  name: string;
  quantity: number;
  category_id: number;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg border">
      <img
        src="LV.jpg"
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="text-lg font-bold text-gray-700 ">{product.name}</h3>
      <p className=" text-gray-600">Quantity: {product.quantity}</p>
    </div>
  );
}
