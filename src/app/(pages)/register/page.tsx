import { Title } from "@/app/components/title/Title";
import type { Metadata } from "next";
import { FormRegister } from "./FormRegister";

export const metadata: Metadata = {
  title: "Đăng ký tài khoản",
  description: "Project nghe nhạc trực tuyến",
};

export default function RegisterPage() {
  return (
    <>
      <div className="mt-[60px] w-[500px] mx-auto">
        <Title text="Đăng Ký Tài Khoản" className="text-center" />
        <FormRegister />
      </div>
    </>
  );
}