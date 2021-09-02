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

import React from "react";
import { IClientSubscribeOptions } from "mqtt";
import { MQTTMessage, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import useAudio from "./useAudio";
import { StrValueFormat } from "../format/ValueFormat";
import { ValueFormat } from "../format/FormatTypes";
const clockalarm = require("../assets/media/128138_1542160-lq.mp3").default;
const gameitem = require("../assets/media/162467_311243-lq.mp3").default;
const bottlewhoo = require("../assets/media/249703_3930831-lq.mp3").default;
const greek = require("../assets/media/322378_4397472-lq.mp3").default;
const bell = require("../assets/media/333695_1187042-lq.mp3").default;
const smokealarm = require("../assets/media/369848_1480854-lq.mp3").default;
const chimes = require("../assets/media/405548_6436863-lq.mp3").default;
const harp = require("../assets/media/486952_6657415-lq.mp3").default;
const messagepop = require("../assets/media/537061_7117640-lq.mp3").default;

type SoundUnitProps = {
  subtopic: string;
  suboptions?: IClientSubscribeOptions;
};

const FORMAT: ValueFormat = StrValueFormat();

const SoundUnit: React.FC<SoundUnitProps> = ({ subtopic, suboptions }) => {
  const [, { play: playClockalarm }] = useAudio(clockalarm);
  const [, { play: playGameitem }] = useAudio(gameitem);
  const [, { play: playBottlewhoo }] = useAudio(bottlewhoo);
  const [, { play: playGreek }] = useAudio(greek);
  const [, { play: playBell }] = useAudio(bell);
  const [, { play: playSmokealarm }] = useAudio(smokealarm);
  const [, { play: playChimes }] = useAudio(chimes);
  const [, { play: playHarp }] = useAudio(harp);
  const [, { play: playMessagepop }] = useAudio(messagepop);

  useMQTTSubscribe(
    subtopic,
    ({ message }: MQTTMessage) => {
      switch (FORMAT.toDisplay(message)) {
        case "clockAlarm":
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
    },
    suboptions
  );

  return <></>;
};

export default SoundUnit;
