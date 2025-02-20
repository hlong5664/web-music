"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPlay } from "react-icons/fa6";

export const ButtonPlay = (props: any) => {
  const { item, className } = props;

  const handlePlay = () => {
    const audio = item.audio;

    const elementPlayAudio: any = document.querySelector(".play-audio");

    if(elementPlayAudio) {
      // Phát nhạc
      const elementAudio = elementPlayAudio.querySelector(".inner-audio");
      const elementSource = elementAudio?.querySelector("source");
      if(elementSource) {
        elementSource.src = audio;
      }
      if(elementAudio) {
        elementAudio.load();
        elementAudio.play();
      }

      // Hiển thị khối Play
      elementPlayAudio.classList.remove("hidden");

      // Hiển thị ảnh
      const elementImage = elementPlayAudio.querySelector(".inner-image");
      elementImage.src = item.image;
      elementImage.alt = item.title;
      
      // Hiển thị tiêu đề
      const elementTitle = elementPlayAudio.querySelector(".inner-title");
      elementTitle.innerHTML = item.title;

      // Hiển thị tên ca sĩ
      const elementSinger = elementPlayAudio.querySelector(".inner-singer");
      elementSinger.innerHTML = item.singer;

      // Hiển thị nút pause
      const elementButtonPlay = elementPlayAudio.querySelector(".inner-button-play");
      elementButtonPlay.classList.add("play");

      // Lấy ra tổng thời gian
      const elementPlayTimeCurrent = elementPlayAudio.querySelector(".inner-play-time .inner-current");
      const elementPlayTimeTotal = elementPlayAudio.querySelector(".inner-play-time .inner-total");
      elementAudio.onloadedmetadata = () => {
        const totalTime = elementAudio.duration;
        elementPlayTimeTotal.max = totalTime;

        // Lấy ra thời gian hiện tại
        elementAudio.ontimeupdate = () => {
          const currentTime = elementAudio.currentTime;
          const percent = currentTime * 100 / totalTime;
          elementPlayTimeCurrent.style.width = `${percent}%`;
          elementPlayTimeTotal.value = currentTime;
        }
      }

      // Xóa class active cho bài hát trước đó đang phát
      const elementSongOld = document.querySelector(`[song-id].active`);
      if(elementSongOld) {
        elementSongOld.classList.remove("active");
      }

      // Thêm class active cho bài hát
      const elementSong = document.querySelector(`[song-id="${item.id}"]`);
      elementSong?.classList.add("active");
    }
  }

  return (
    <>
      <button 
        className={className}
        onClick={handlePlay}
      >
        <FaPlay />
      </button>
    </>
  )
}