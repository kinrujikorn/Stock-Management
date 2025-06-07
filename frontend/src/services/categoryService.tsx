const CATEGORY_API = "http://localhost:3000/categories";

export const getCategory = async () => {
  const res = await fetch(CATEGORY_API);
  if (!res.ok) throw new Error("โหลดหมวดหมู่ไม่สำเร็จ");
  return res.json();
};

export const createCategory = async (category: { category_name: string }) => {
  const res = await fetch(CATEGORY_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error("เพิ่มหมวดหมู่ไม่สำเร็จ");
  return res.json();
};
