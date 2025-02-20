/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { FaBackwardStep, FaPlay, FaForwardStep, FaPause } from "react-icons/fa6";

export const PlayActions = () => {

  const handlePlay = () => {
    const elementPlayAudio: any = document.querySelector(".play-audio");
    const elementButtonPlay = elementPlayAudio.querySelector(".inner-button-play");
    const elementAudio = elementPlayAudio.querySelector(".inner-audio");

    if(elementButtonPlay.classList.contains("play")) {
      elementButtonPlay.classList.remove("play");
      elementAudio.pause();
    } else {
      elementButtonPlay.classList.add("play");
      elementAudio.play();
    }
  }

  const handlePrev = () => {
    const currentSong = document.querySelector("[song-id].active");
    if(currentSong) {
      const prevSong = currentSong.previousElementSibling;
      if(prevSong) {
        const buttonPlay: any = prevSong.querySelector(".inner-button-play");
        buttonPlay.click();
      }
    }
  }

  const handleNext = () => {
    const currentSong = document.querySelector("[song-id].active");
    if(currentSong) {
      const nextSong = currentSong.nextElementSibling;
      if(nextSong) {
        const buttonPlay: any = nextSong.querySelector(".inner-button-play");
        buttonPlay.click();
      }
    }
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button className="text-[16px] text-white" onClick={handlePrev}>
          <FaBackwardStep />
        </button>
        <button 
          className="text-[16px] text-white w-[32px] h-[32px] bg-[#00ADEF] rounded-full inline-flex items-center justify-center mx-[42px] inner-button-play"
          onClick={handlePlay}
        >
          <FaPlay className="inner-icon-play" />
          <FaPause className="inner-icon-pause" />
        </button>
        <button className="text-[16px] text-white" onClick={handleNext}>
          <FaForwardStep />
        </button>
      </div>
    </>
  )
}