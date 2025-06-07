import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  const getImageUrl = (url: string | null | undefined) => {
    if (!url) return "/LV.jpg";

    try {
      // Just return the URL as is - it should already be properly formatted from the backend
      return url;
    } catch (error) {
      console.error("Error with image URL:", url, error);
      return "/LV.jpg";
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg border">
      <div className="flex justify-center items-center h-[250px] w-[270px] mx-auto">
        <img
          src={getImageUrl(product.image_url)}
          alt={product.name}
          className="max-h-full max-w-full object-contain rounded-lg"
          onError={(e) => {
            console.error("Image failed to load:", product.image_url);
            e.currentTarget.src = "/LV.jpg";
          }}
        />
      </div>
      <h3 className="text-lg font-bold text-gray-700">{product.name}</h3>

      <p className="text-gray-600">
        Quantity:{" "}
        {product.quantity === 0 ? (
          <span className="text-red-500">Out of Stock</span>
        ) : (
          product.quantity
        )}
      </p>
      <p className="text-gray-600">Price: ${product.price}</p>
    </div>
  );
}
