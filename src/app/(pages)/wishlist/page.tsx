import { Title } from "@/app/components/title/Title";
import type { Metadata } from "next";
import { WishList } from "./WishList";

export const metadata: Metadata = {
  title: "Bài hát yêu thích",
  description: "Project nghe nhạc trực tuyến",
};

export default function WishListPage() {
  return (
    <>
      <div className="mt-[30px]">
      <Title text="Bài Hát Yêu Thích" />
      <WishList />
    </div>
    </>
  );
}