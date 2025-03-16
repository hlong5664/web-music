"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-comment-textnodes */
import { CardInfo } from "@/app/components/card/CardInfo";
import { SongItem2 } from "@/app/components/song/SongItem2";
import { Title } from "@/app/components/title/Title";
import { dbFirebase } from "@/app/firebaseConfig";
import { get, ref } from "firebase/database";
import { useEffect, useState, use } from "react";

export default function SongDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Dùng `use()` để unwrap `params`

  const [dataFinal, setDataFinal] = useState<any>(null);
  const [dataSection3, setDataSection3] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Lấy thông tin bài hát
      const songSnapshot = await get(ref(dbFirebase, `/songs/${id}`));
      const songData = songSnapshot.val();

      if (!songData) return;

      // Lấy thông tin ca sĩ
      const singerSnapshot = await get(
        ref(dbFirebase, `/singers/${songData.singerId[0]}`)
      );
      const singerData = singerSnapshot.val();
      songData["singer"] = singerData?.title || "Unknown";

      setDataFinal(songData);

      // Lấy danh sách bài hát cùng danh mục
      const songsSnapshot = await get(ref(dbFirebase, "songs"));
      const relatedSongs: any[] = [];

      songsSnapshot.forEach((item) => {
        const key = item.key;
        const data = item.val();

        if (data.categoryId === songData.categoryId && key !== id) {
          relatedSongs.push({
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

      // Lấy thông tin ca sĩ của từng bài hát liên quan
      const updatedSongs = await Promise.all(
        relatedSongs.map(async (song) => {
          const singerSnap = await get(
            ref(dbFirebase, `/singers/${song.singerId}`)
          );
          return {
            ...song,
            singer: singerSnap.val()?.title || "Unknown",
          };
        })
      );

      setDataSection3(updatedSongs);
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
          description={dataFinal.singer}
        />
      )}

      {/* Lời Bài Hát */}
      {dataFinal?.lyric && (
        <div className="mt-[30px]">
          <Title text="Lời Bài Hát" />
          <div className="bg-[#212121] text-white rounded-[15px] p-[20px] whitespace-pre-line">
            {dataFinal.lyric}
          </div>
        </div>
      )}

      {/* Bài Hát Cùng Danh Mục */}
      <div className="mt-[30px]">
        <Title text="Bài Hát Cùng Danh Mục" />
        <div className="grid grid-cols-1 gap-[10px]">
          {dataSection3.map((item, index) => (
            <SongItem2 key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
