"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardItem } from "@/app/components/card/CardItem";
import { Title } from "@/app/components/title/Title";
import { dbFirebase } from "@/app/firebaseConfig";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Danh sách ca sĩ",
//   description: "Project nghe nhạc trực tuyến",
// };

export default function SingerPage() {
  const [dataFinal, setDataFinal] = useState<any>([]);
  useEffect(() => {
    const dataSection1: any[] = [];

    const fetchData = async () => {
      const items = await get(ref(dbFirebase, "singers"));
      items.forEach((item: any) => {
        const key = item.key;
        const data = item.val();

        dataSection1.push({
          id: key,
          image: data.image,
          title: data.title,
          description: data.description,
          link: `/singers/${key}`,
        });
      });

      setDataFinal(dataSection1);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="mt-[30px]">
        <Title text="Danh Sách Ca Sĩ" />
      </div>
      <div className="grid grid-cols-5 gap-[20px]">
        {dataFinal.map((item: any, index: any) => (
          <CardItem key={index} item={item} />
        ))}
      </div>
    </>
  );
}
