import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import Search from "@/components/Search";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
type Product = {
  id: string;
  name: string;
  quantity: number;
  category_id: number;
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
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <h1 className="text-5xl py-10 flex justify-center">Product</h1>

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
      {/* <a href="/products">View Products</a> */}
    </div>
  );
}
