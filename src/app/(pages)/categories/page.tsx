"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardItem } from "@/app/components/card/CardItem";
import { Title } from "@/app/components/title/Title";
import { dbFirebase } from "@/app/firebaseConfig";
import { onValue, ref, off } from "firebase/database";
// import { Metadata } from "next";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "Danh mục bài hát",
//   description: "Project nghe nhạc trực tuyến",
// };

export default function CategoryPage() {
  // 1. Tạo state để lưu danh sách categories
  const [categoriesData, setCategoriesData] = useState<any[]>([]);

  useEffect(() => {
    // 2. Tham chiếu đến "categories" trên Firebase
    const categoriesRef = ref(dbFirebase, "categories");

    // 3. Lắng nghe dữ liệu (onValue) và set lại state
    const unsubscribe = onValue(categoriesRef, (snapshot) => {
      const newCategoriesData: any[] = [];
      snapshot.forEach((item) => {
        const key = item.key;
        const data = item.val();
        newCategoriesData.push({
          id: key,
          image: data.image,
          title: data.title,
          description: data.description,
          link: `/categories/${key}`,
        });
      });
      setCategoriesData(newCategoriesData);
    });

    // 4. Cleanup (hủy lắng nghe) khi unmount
    return () => {
      off(categoriesRef);
      // Hoặc dùng:
      // unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="mt-[30px]">
        <Title text="Danh Mục Bài Hát" />
      </div>
      <div className="grid grid-cols-5 gap-[20px]">
        {categoriesData.map((item, index) => (
          <CardItem key={index} item={item} />
        ))}
      </div>
    </>
  );
}
