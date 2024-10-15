import c from "classnames";
import s from "./index.module.less";
import IconButton from "../IconButton";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

interface IMusicPlayer {
  className?: string;
}

export type MusicPlayerRef = {
  play: () => void;
  pause: () => void;
};

const MusicPlayer = forwardRef<MusicPlayerRef, IMusicPlayer>(({ className }, ref) => {
  const playerRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setPlaying] = useState<boolean>(true);

  useImperativeHandle(ref, () => ({
    play() {
      playerRef.current?.play();
      setPlaying(true);
    },
    pause() {
      playerRef.current?.pause();
      setPlaying(false);
    },
  }));

  return (
    <div className={c(className, { [s.is_playing]: isPlaying })}>
      {isPlaying ? (
        <IconButton
          name="music-play"
          onClick={() => {
            playerRef.current?.pause();
            setPlaying(false);
          }}
        />
      ) : (
        <IconButton
          name="music-stop"
          onClick={() => {
            playerRef.current?.play();
            setPlaying(true);
          }}
        />
      )}
      <audio src="/music/shiguang.mp3" ref={playerRef} loop />
    </div>
  );
});

export default MusicPlayer;
