"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const PlayTime = () => {

  const handleChange = (event: any) => {
    const elementPlayAudio: any = document.querySelector(".play-audio");
    const elementAudio = elementPlayAudio.querySelector(".inner-audio");
    const elementTotal = event.target;
    const value = parseFloat(elementTotal.value);
    elementAudio.currentTime = value;
  }

  return (
    <>
      <div className="mt-[11px] relative inner-play-time">
        <div className="h-[4px] w-[0] bg-[#00ADEF] rounded-[50px] absolute left-0 top-[13px] inner-current"></div>
        <input 
          type="range" 
          min={0}
          max={0}
          defaultValue={0}
          className="w-full h-[4px] bg-[#FFFFFF0A] appearance-none rounded-[50px] cursor-pointer range-sm inner-total"
          onChange={handleChange}
        />
      </div>
    </>
  )
}