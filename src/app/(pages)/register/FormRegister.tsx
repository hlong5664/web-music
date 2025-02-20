/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { authFirebase, dbFirebase } from "@/app/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useRouter } from "next/navigation";

export const FormRegister = () => {
  const router = useRouter();

  const handleRegister = (event: any) => {
    event.preventDefault();

    const fullName = event.target.fullName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if(fullName && email && password) {
      createUserWithEmailAndPassword(authFirebase, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if(user) {
            set(ref(dbFirebase, 'users/' + user.uid), {
              fullName: fullName
            }).then(() => {
              router.push("/");
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <>
      <form className="" onSubmit={handleRegister}>
        <div className="mb-[15px]">
          <label 
            className="block mb-[5px] font-[600] text-[14px]" 
            htmlFor="fullName"
          >
            <span className="text-white">Họ Tên</span>
            <span className="text-red-500 ml-[5px]">*</span>
          </label>
          <input 
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Ví dụ: Le Van A"
            className="h-[50px] w-full bg-white rounded-[6px] px-[16px] font-[600] text-[14px] outline-none"
            required={true}
          />
        </div>
        <div className="mb-[15px]">
          <label 
            className="block mb-[5px] font-[600] text-[14px]" 
            htmlFor="email"
          >
            <span className="text-white">Email</span>
            <span className="text-red-500 ml-[5px]">*</span>
          </label>
          <input 
            type="email"
            name="email"
            id="email"
            placeholder="Ví dụ: levana@gmail.com"
            className="h-[50px] w-full bg-white rounded-[6px] px-[16px] font-[600] text-[14px] outline-none"
            required={true}
          />
        </div>
        <div className="mb-[15px]">
          <label 
            className="block mb-[5px] font-[600] text-[14px]" 
            htmlFor="password"
          >
            <span className="text-white">Mật Khẩu</span>
            <span className="text-red-500 ml-[5px]">*</span>
          </label>
          <input 
            type="password"
            name="password"
            id="password"
            className="h-[50px] w-full bg-white rounded-[6px] px-[16px] font-[600] text-[14px] outline-none"
            required={true}
          />
        </div>
        <button
          type="submit"
          className="h-[50px] w-full bg-[#00ADEF] text-white rounded-[6px] font-[600] text-[16px]"
        >
          Đăng Ký
        </button>
      </form>
    </>
  )
}