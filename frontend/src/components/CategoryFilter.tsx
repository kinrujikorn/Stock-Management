import { useEffect, useState } from "react";
import { getCategory } from "@/services/categoryService";

type Props = {
  selected: number | null;
  onChange: (id: number | null) => void;
};

export default function CategoryFilter({ selected, onChange }: Props) {
  const [category, setcategory] = useState<
    { category_id: number; category_name: string }[]
  >([]);

  useEffect(() => {
    getCategory().then(setcategory);
  }, []);
  return (
    <div className="bg-white rounded-lg p-4 m-4 h-full w-30">
      <button
        onClick={() => onChange(null)}
        className={`block text-black ${
          selected === null ? "font-bold underline" : ""
        }`}
      >
        ALL
      </button>

      {category.map((c) => (
        <button
          key={c.category_id}
          onClick={() => onChange(c.category_id)}
          className={`block text-black ${
            selected === c.category_id ? "font-bold underline" : ""
          }`}
        >
          {c.category_name}
        </button>
      ))}
    </div>
  );
}
