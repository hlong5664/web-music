"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { CardInfo } from "@/app/components/card/CardInfo";
import { SongItem2 } from "@/app/components/song/SongItem2";
import { Title } from "@/app/components/title/Title";
import { dbFirebase } from "@/app/firebaseConfig";
import { get, ref } from "firebase/database";
import { useEffect, useState, use } from "react";

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // ✅ Dùng `use()` để unwrap `params`

  const [dataFinal, setDataFinal] = useState<any>(null);
  const [dataSection2, setDataSection2] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Lấy thông tin danh mục
      const categorySnapshot = await get(ref(dbFirebase, `/categories/${id}`));
      setDataFinal(categorySnapshot.val());

      // Lấy danh sách bài hát thuộc danh mục
      const songSnapshot = await get(ref(dbFirebase, "songs"));
      const songs: any[] = [];

      songSnapshot.forEach((item) => {
        const key = item.key;
        const data = item.val();

        if (data.categoryId === id) {
          songs.push({
            id: key,
            image: data.image,
            title: data.title,
            singerId: data.singerId[0],
            link: `/song/${key}`,
            time: "4:32",
            audio: data.audio,
          });
        }
      });

      // Lấy thông tin ca sĩ của từng bài hát
      const updatedSongs = await Promise.all(
        songs.map(async (song) => {
          const singerSnapshot = await get(
            ref(dbFirebase, `/singers/${song.singerId}`)
          );
          return {
            ...song,
            singer: singerSnapshot.val()?.title || "Unknown",
          };
        })
      );

      setDataSection2(updatedSongs);
    };

    fetchData();
  }, [id]);

  return (
    <>
      {/* CardInfo */}
      {dataFinal && (
        <CardInfo
          image={dataFinal.image}
          title={dataFinal.title}
          description={dataFinal.description}
        />
      )}

      {/* Section 2 */}
      <div className="mt-[30px]">
        <Title text="Danh Sách Bài Hát" />
        <div className="grid grid-cols-1 gap-[10px]">
          {dataSection2.map((item, index) => (
            <SongItem2 key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
