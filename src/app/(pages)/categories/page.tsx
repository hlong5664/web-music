/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardItem } from "@/app/components/card/CardItem";
import { Title } from "@/app/components/title/Title";
import { dbFirebase } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh mục bài hát",
  description: "Project nghe nhạc trực tuyến",
};

export default function CategoryPage() {
  const dataFinal: any[] = [];
  const categoryRef = ref(dbFirebase, 'categories');
  onValue(categoryRef, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();

      dataFinal.push(
        {
          id: key,
          image: data.image,
          title: data.title,
          description: data.description,
          link: `/categories/${key}`
        }
      );
    })
  });

  return (
    <>
      <div className="mt-[30px]">
        <Title text="Danh Mục Bài Hát" />
      </div>
      <div className="grid grid-cols-5 gap-[20px]">
        {dataFinal.map((item, index) => (
          <CardItem key={index} item={item} />
        ))}
      </div>
    </>
  );
}