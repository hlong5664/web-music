"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { use, useEffect, useState } from "react";
import { CardInfo } from "@/app/components/card/CardInfo";
import { SongItem2 } from "@/app/components/song/SongItem2";
import { Title } from "@/app/components/title/Title";
import { dbFirebase } from "@/app/firebaseConfig";
import { get, ref } from "firebase/database";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Chi tiết ca sĩ",
//   description: "Project nghe nhạc trực tuyến",
// };

export default function SingerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // ✅ Dùng `use()` để unwrap `params`

  const [singerData, setSingerData] = useState<any>(null);
  const [songs, setSongs] = useState<any[]>([]);

  // Lấy dữ liệu ca sĩ
  useEffect(() => {
    const fetchSingerData = async () => {
      const singerRef = ref(dbFirebase, `/singers/${id}`);
      const snapshot = await get(singerRef);
      if (snapshot.exists()) {
        setSingerData(snapshot.val());
      }
    };

    fetchSingerData();
  }, [id]);

  // Lấy danh sách bài hát của ca sĩ
  useEffect(() => {
    if (!singerData) return;

    const fetchSongs = async () => {
      const songRef = ref(dbFirebase, "songs");
      const snapshot = await get(songRef);
      if (snapshot.exists()) {
        const songsArray: any[] = [];
        snapshot.forEach((item) => {
          const key = item.key;
          const data = item.val();

          if (data.singerId.includes(id)) {
            songsArray.push({
              id: key,
              image: data.image,
              title: data.title,
              singer: singerData.title,
              link: `/song/${key}`,
              time: "4:32",
              audio: data.audio,
            });
          }
        });

        setSongs(songsArray);
      }
    };

    fetchSongs();
  }, [id, singerData]);

  return (
    <>
      {singerData && (
        <CardInfo
          image={singerData.image}
          title={singerData.title}
          description={singerData.description}
        />
      )}

      <div className="mt-[30px]">
        <Title text="Danh Sách Bài Hát" />

        <div className="grid grid-cols-1 gap-[10px]">
          {songs.map((item, index) => (
            <SongItem2 key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
