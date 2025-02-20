import { Title } from "@/app/components/title/Title";
import type { Metadata } from "next";
import { Section1 } from "./Section1";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Kết quả tìm kiếm",
  description: "Project nghe nhạc trực tuyến",
};

export default function SearchPage() {
  return (
    <>
      <div className="mt-[30px]">
        <Title text="Kết Quả Tìm Kiếm" />

        <div className="grid grid-cols-1 gap-[10px]">
          <Suspense>
            <Section1 />
          </Suspense>
        </div>
      </div>
    </>
  );
}