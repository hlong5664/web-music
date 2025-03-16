"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
// import type { Metadata } from "next";
import { Title } from "./components/title/Title";
import { SongItem } from "./components/song/SongItem";
import { CardItem } from "./components/card/CardItem";
import { get, ref } from "firebase/database";
import { dbFirebase } from "./firebaseConfig";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "Trang chủ",
//   description: "Project nghe nhạc trực tuyến",
// };

export default function Home() {
  const [dataSection1, setDataSection1] = useState<any[]>([]);
  const [dataSection2, setDataSection2] = useState<any[]>([]);
  const [dataSection3, setDataSection3] = useState<any[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const snapshot = await get(ref(dbFirebase, "songs"));
      const tempSongs: any[] = [];

      snapshot.forEach((item) => {
        if (tempSongs.length < 3) {
          const key = item.key;
          const data = item.val();

          tempSongs.push({
            id: key,
            image: data.image,
            title: data.title,
            singerId: data.singerId[0],
            listen: data.listen,
            link: `/song/${key}`,
            audio: data.audio,
            wishlist: data.wishlist,
          });
        }
      });

      // Lấy thông tin ca sĩ cho từng bài hát
      const updatedSongs = await Promise.all(
        tempSongs.map(async (song) => {
          const singerSnap = await get(
            ref(dbFirebase, `/singers/${song.singerId}`)
          );
          return {
            ...song,
            singer: singerSnap.val()?.title || "Unknown",
          };
        })
      );

      setDataSection1(updatedSongs);
    };

    const fetchCategories = async () => {
      const snapshot = await get(ref(dbFirebase, "categories"));
      const categories: any[] = [];

      snapshot.forEach((item) => {
        if (categories.length < 5) {
          const key = item.key;
          const data = item.val();

          categories.push({
            id: key,
            image: data.image,
            title: data.title,
            description: data.description,
            link: `/categories/${key}`,
          });
        }
      });

      setDataSection2(categories);
    };

    const fetchSingers = async () => {
      const snapshot = await get(ref(dbFirebase, "singers"));
      const singers: any[] = [];

      snapshot.forEach((item) => {
        if (singers.length < 5) {
          const key = item.key;
          const data = item.val();

          singers.push({
            id: key,
            image: data.image,
            title: data.title,
            description: data.description,
            link: `/singers/${key}`,
          });
        }
      });

      setDataSection3(singers);
    };

    fetchSongs();
    fetchCategories();
    fetchSingers();
  }, []);

  return (
    <>
      {/* Section 1: Banner Home + Nghe Nhiều */}
      <div className="flex items-start">
        <div className="w-[534px]">
          <div
            className="w-full flex items-center rounded-[15px] bg-cover"
            style={{ backgroundImage: "url('/demo/background-1.png')" }}
          >
            <div className="flex-1 mr-[34px] ml-[30px]">
              <div className="font-[700] text-[32px] text-white mb-[6px]">
                Nhạc EDM
              </div>
              <div className="font-[500] text-[14px] text-white">
                Top 100 Nhạc Electronic/Dance Âu Mỹ là danh sách 100 ca khúc hot
                nhất hiện tại của thể loại Top 100 Nhạc Electronic/Dance Âu Mỹ
              </div>
            </div>
            <div className="w-[215px] mr-[22px] mt-[48px]">
              <img
                src="/demo/image-2.png"
                alt="Nhạc EDM"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 ml-[20px]">
          <Title text="Nghe Nhiều" />
          <div className="grid grid-cols-1 gap-[12px]">
            {dataSection1.map((item, index) => (
              <SongItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Danh Mục Nổi Bật */}
      <div className="mt-[30px]">
        <Title text="Danh Mục Nổi Bật" />
      </div>
      <div className="grid grid-cols-5 gap-[20px]">
        {dataSection2.map((item, index) => (
          <CardItem key={index} item={item} />
        ))}
      </div>

      {/* Section 3: Ca Sĩ Nổi Bật */}
      <div className="mt-[30px]">
        <Title text="Ca Sĩ Nổi Bật" />
      </div>
      <div className="grid grid-cols-5 gap-[20px]">
        {dataSection3.map((item, index) => (
          <CardItem key={index} item={item} />
        ))}
      </div>
    </>
  );
}
