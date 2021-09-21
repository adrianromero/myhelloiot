/*
MYHELLOIOT
Copyright (C) 2021 Adrián Romero
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { useState, useEffect } from "react";

const useAudio = (
  url: string,
  options: { loop?: boolean; volume?: number } = {}
): [
  { playing: boolean },
  { play: () => void; pause: () => void; resume: () => void }
] => {
  const [audio] = useState<HTMLAudioElement>(new Audio(url));
  const [, setUpdate] = useState<boolean>(false);
  const forceUpdate = () => setUpdate((prevState) => !prevState);

  useEffect(() => {
    audio.loop = options.loop ?? false;
    audio.volume = options.volume ?? 1.0;
    audio.addEventListener("play", forceUpdate);
    audio.addEventListener("pause", forceUpdate);
    audio.addEventListener("ended", forceUpdate);

    return () => {
      audio.removeEventListener("play", forceUpdate);
      audio.removeEventListener("pause", forceUpdate);
      audio.removeEventListener("ended", forceUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio]);

  const play = () => {
    audio.currentTime = 0;
    try {
      audio.play();
    } catch (ex) {
      // Might fail if no user gesture since loading the page
    }
  };
  const pause = () => audio.pause();
  const resume = () => audio.play();

  return [{ playing: !audio.paused }, { play, pause, resume }];
};

export default useAudio;
