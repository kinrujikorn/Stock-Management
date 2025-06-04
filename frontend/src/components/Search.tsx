import { useState } from "react";

type SearchProps = {
  onSearchChange: (term: string) => void;
};

export default function Search({ onSearchChange }: SearchProps) {
  const [search, setSearch] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };
  return (
    <div className="flex justify-center w-200 h-10">
      <input
        type="text"
        placeholder="Searching"
        value={search}
        onChange={handleChange}
        className="px-4 py-2 border rounded w-200"
      />
    </div>
  );
}
