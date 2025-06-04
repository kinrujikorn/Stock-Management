const CATEGORY_API = "http://localhost:3000/category";

export const getCategory = async () => {
  const res = await fetch(CATEGORY_API);
  if (!res.ok) throw new Error("โหลดหมวดหมู่ไม่สำเร็จ");
  return res.json();
};
