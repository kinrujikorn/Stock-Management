import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import Search from "@/components/Search";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";

export type Product = {
  id: number;
  name: string;
  quantity: number;
  category_id: number;
  image_url?: string | null;
  price: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  // console.log("Products:", products);
  // console.log("SelectedCategory:", selectedCategory);
  const filtered = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === null || p.category_id === selectedCategory;
    return matchName && matchCategory;
  });

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      console.log("Fetched products:", data); // ✅ This logs the actual products
    });
  }, []);

  return (
    <div className="flex">
      <Navbar></Navbar>
      <main className="ml-64 w-full p-12">
        <h1 className="text-5xl py-10 flex justify-center">Product</h1>
        <div className="container mx-auto">
          <div className="flex justify-center">
            <CategoryFilter
              selected={selectedCategory}
              onChange={(id) => {
                console.log("Selected category id:", id);
                setSelectedCategory(id);
              }}
            />
            <div>
              <Search onSearchChange={setSearchTerm}></Search>
              <div className="flex justify-center">
                <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <a href="/products">View Products</a> */}
    </div>
  );
}
