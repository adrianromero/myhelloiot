/*
MYHELLOIOT
Copyright (C) 2021-2023 Adrián Romero
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

import React, { useEffect } from "react";
import { IClientSubscribeOptions } from "mqtt";
import { notification } from "antd";
import type { MQTTMessage } from "../mqtt/MQTTProvider";
import { useMQTTSubscribe } from "../mqtt/MQTTHooks";
import useAudio from "./useAudio";
import { StringValueFormat } from "../format/ValueFormat";
import { ValueFormat } from "../format/FormatTypes";
const clockalarm = new URL("../assets/media/128138_1542160-lq.mp3?url", import.meta.url).href;
const gameitem = new URL("../assets/media/162467_311243-lq.mp3", import.meta.url).href;
const bottlewhoo = new URL("../assets/media/249703_3930831-lq.mp3", import.meta.url).href;
const greek = new URL("../assets/media/322378_4397472-lq.mp3", import.meta.url).href;
const bell = new URL("../assets/media/333695_1187042-lq.mp3", import.meta.url).href;
const smokealarm = new URL("../assets/media/369848_1480854-lq.mp3", import.meta.url).href;
const chimes = new URL("../assets/media/405548_6436863-lq.mp3", import.meta.url).href;
const harp = new URL("../assets/media/486952_6657415-lq.mp3", import.meta.url).href;
const messagepop = new URL("../assets/media/537061_7117640-lq.mp3", import.meta.url).href;

type SoundUnitProps = {
  subtopic?: string;
  suboptions?: IClientSubscribeOptions;
  volume?: number;
};

const FORMAT: ValueFormat = StringValueFormat();

const SoundUnit: React.FC<SoundUnitProps> = ({
  subtopic = "",
  suboptions,
  volume = 1.0,
}) => {
  const [, { play: playClockalarm, pause: pauseClockAlarm }] = useAudio(
    clockalarm,
    { volume }
  );
  const [, { play: playGameitem, pause: pauseGameitem }] = useAudio(gameitem, {
    volume,
  });
  const [, { play: playBottlewhoo, pause: pauseBottlewhoo }] = useAudio(
    bottlewhoo,
    { volume }
  );
  const [, { play: playGreek, pause: pauseGreek }] = useAudio(greek, {
    volume,
  });
  const [, { play: playBell, pause: pauseBell }] = useAudio(bell, { volume });
  const [, { play: playSmokealarm, pause: pauseSmokealarm }] = useAudio(
    smokealarm,
    { volume }
  );
  const [, { play: playChimes, pause: pauseChimes }] = useAudio(chimes, {
    volume,
  });
  const [, { play: playHarp, pause: pauseHarp }] = useAudio(harp, { volume });
  const [, { play: playMessagepop, pause: pauseMessagepop }] = useAudio(
    messagepop,
    { volume }
  );
  const [notificationInstance, notificationContext] = notification.useNotification();

  useMQTTSubscribe(
    subtopic,
    ({ message }: MQTTMessage) => {
      try {
        switch (FORMAT.toDisplay(message)) {
          case "clockalarm":
            playClockalarm();
            break;
          case "botlewhoo":
            playBottlewhoo();
            break;
          case "greek":
            playGreek();
            break;
          case "bell":
            playBell();
            break;
          case "smokealarm":
            playSmokealarm();
            break;
          case "chimes":
            playChimes();
            break;
          case "harp":
            playHarp();
            break;
          case "messagepop":
            playMessagepop();
            break;
          default:
            playGameitem();
        }
      } catch (error) {
        notificationInstance.warning({
          message: "Play audio",
          description: "Audio cannot be played. Please review the application permissions.",
          placement: "bottomRight"
        });
      }
    },
    suboptions
  );

  useEffect(
    () => () => {
      pauseClockAlarm();
      pauseGameitem();
      pauseBottlewhoo();
      pauseGreek();
      pauseBell();
      pauseSmokealarm();
      pauseChimes();
      pauseHarp();
      pauseMessagepop();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return <>{notificationContext}</>;
};

export default SoundUnit;
