import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import Search from "@/components/Search";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { Product } from "@/types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [activeSort, setActiveSort] = useState<"newest" | "3days" | undefined>(
    undefined
  );
  // console.log("Products:", products);
  // console.log("SelectedCategory:", selectedCategory);
  const filtered = products
    .filter((p) => {
      const matchName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory =
        selectedCategory === null || p.category_id === selectedCategory;

      // For 3days filter only
      if (activeSort === "3days") {
        const productDate = new Date(p.created_at);
        const now = new Date();
        return (
          matchName &&
          matchCategory &&
          productDate >= new Date(now.setDate(now.getDate() - 3))
        );
      }

      return matchName && matchCategory;
    })
    .sort((a, b) => {
      // Sort by newest first when activeSort is "newest" or "3days"
      if (activeSort) {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }
      return 0;
    });

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      console.log("Fetched products:", data); // ✅ This logs the actual products
    });
  }, []);

  return (
    <div className="flex">
      <Navbar />
      <main className="ml-48 w-full p-8">
        <div className="container mx-auto px-4 ">
          <h1 className="text-5xl py-10 ">Product</h1>
          <div className="flex flex-col">
            <Search onSearchChange={setSearchTerm} />
            <CategoryFilter
              selected={selectedCategory}
              onChange={setSelectedCategory}
              onSortChange={setActiveSort}
              activeSort={activeSort}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
