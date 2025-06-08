import { useEffect, useState } from "react";
import { getCategory } from "@/services/categoryService";

type Props = {
  selected: number | null;
  onChange: (id: number | null) => void;
  activeSort: "newest" | "3days" | undefined;
  onSortChange: (sort: "newest" | "3days" | undefined) => void;
};

export default function CategoryFilter({
  selected,
  onChange,
  activeSort,
  onSortChange,
}: Props) {
  const [category, setcategory] = useState<
    { category_id: number; category_name: string }[]
  >([]);

  useEffect(() => {
    getCategory().then(setcategory);
  }, []);

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <button
        onClick={() => {
          onChange(null);
          onSortChange(undefined);
        }}
        className={`px-4 py-2 rounded-full transition-all ${
          selected === null && !activeSort
            ? "bg-[#303030] text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All
      </button>

      <button
        onClick={() => {
          onChange(null);
          onSortChange("newest");
        }}
        className={`px-4 py-2 rounded-full transition-all ${
          activeSort === "newest"
            ? "bg-[#303030] text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Newest
      </button>

      <button
        onClick={() => {
          onChange(null);
          onSortChange("3days");
        }}
        className={`px-4 py-2 rounded-full transition-all ${
          activeSort === "3days"
            ? "bg-[#303030]  text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Last 3 Days
      </button>

      {category.map((c) => (
        <button
          key={c.category_id}
          onClick={() => {
            onChange(c.category_id);
            onSortChange(undefined);
          }}
          className={`px-4 py-2 rounded-full transition-all ${
            selected === c.category_id
              ? "bg-[#303030] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {c.category_name}
        </button>
      ))}
    </div>
  );
}
