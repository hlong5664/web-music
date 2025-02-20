/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-comment-textnodes */
import { CardInfo } from "@/app/components/card/CardInfo";
import { SongItem2 } from "@/app/components/song/SongItem2";
import { Title } from "@/app/components/title/Title";
import { dbFirebase } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết bài hát",
  description: "Project nghe nhạc trực tuyến",
};

export default async function SongDetailPage(props: any) {
  const { id } = await props.params;
  let dataFinal: any = null;

  onValue(ref(dbFirebase, '/songs/' + id), (item) => {
    dataFinal = item.val();

    onValue(ref(dbFirebase, '/singers/' + dataFinal.singerId[0]), (itemSinger) => {
      const dataSinger = itemSinger.val();
      dataFinal["singer"] = dataSinger.title;
    })
  })

  const dataSection3: any[] = [];
  const songRef = ref(dbFirebase, 'songs');
  onValue(songRef, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();

      if(data.categoryId === dataFinal.categoryId && key !== id) {
        onValue(ref(dbFirebase, '/singers/' + data.singerId[0]), (itemSinger) => {
          const dataSinger = itemSinger.val();
          dataSection3.push(
            {
              id: key,
              image: data.image,
              title: data.title,
              singer: dataSinger.title,
              link: `/song/${key}`,
              time: "4:32",
              audio: data.audio
            }
          );
        })
      }
    })
  });

  return (
    <>
      {/* CardInfo */}
      <CardInfo
        image={dataFinal.image}
        title={dataFinal.title}
        description={dataFinal.singer}
      />

      {/* Lời Bài Hát */}
      <div className="mt-[30px]">
        <Title text="Lời Bài Hát" />
        <div className="bg-[#212121] text-white rounded-[15px] p-[20px] whitespace-pre-line">
          {dataFinal.lyric}
        </div>
      </div>

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