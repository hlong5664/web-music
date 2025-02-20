/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { FaVolumeHigh } from "react-icons/fa6";

export const PlayVolume = () => {

  const handleChange = (event: any) => {
    const elementPlayAudio: any = document.querySelector(".play-audio");
    const elementAudio = elementPlayAudio.querySelector(".inner-audio");
    const elementVolumeCurrent = elementPlayAudio.querySelector(".inner-volume .inner-current");
    const elementTotal = event.target;
    const value = parseFloat(elementTotal.value);
    elementAudio.volume = value/100;
    elementVolumeCurrent.style.width = `${value}%`;
  }

  return (
    <>
      <div className="w-[184px] flex items-end inner-volume">
        <button className="text-[16px] text-white">
          <FaVolumeHigh />
        </button>
        <div className="ml-[6px] relative">
          <div className="h-[3px] w-[100%] bg-[#00ADEF] rounded-[50px] absolute left-0 top-[14px] inner-current"></div>
          <input
            type="range" 
            min={0}
            max={100}
            defaultValue={100}
            className="w-full h-[3px] bg-[#FFFFFF1A] appearance-none rounded-[50px] cursor-pointer range-sm inner-total"
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  )
}