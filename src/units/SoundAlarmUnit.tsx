/*
MYHELLOIOT
Copyright (C) 2021-2022 Adrián Romero
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
import { MQTTMessage, useMQTTSubscribe } from "../mqtt/MQTTProvider";
import useAudio from "./useAudio";
import { StringValueFormat } from "../format/ValueFormat";
import { ValueFormat } from "../format/FormatTypes";
import { useAppStoreProperty } from "../AppStoreProvider";
const clockalarm = require("../assets/media/128138_1542160-lq.mp3").default;
const gameitem = require("../assets/media/162467_311243-lq.mp3").default;
const bottlewhoo = require("../assets/media/249703_3930831-lq.mp3").default;
const greek = require("../assets/media/322378_4397472-lq.mp3").default;
const bell = require("../assets/media/333695_1187042-lq.mp3").default;
const smokealarm = require("../assets/media/369848_1480854-lq.mp3").default;
const chimes = require("../assets/media/405548_6436863-lq.mp3").default;
const harp = require("../assets/media/486952_6657415-lq.mp3").default;
const messagepop = require("../assets/media/537061_7117640-lq.mp3").default;

type SoundAlarmUnitProps = {
  instancekey?: string;
  subtopic?: string;
  suboptions?: IClientSubscribeOptions;
  sound?: string;
  volume?: number;
  loop?: boolean;
};

const FORMAT: ValueFormat = StringValueFormat();

const SoundAlarmUnit: React.FC<SoundAlarmUnitProps> = ({
  instancekey = "",
  subtopic = "",
  suboptions,
  sound = "gameitem",
  volume = 1.0,
  loop = true,
}) => {
  let url: string;
  switch (sound) {
    case "clockalarm":
      url = clockalarm;
      break;
    case "botlewhoo":
      url = bottlewhoo;
      break;
    case "greek":
      url = greek;
      break;
    case "bell":
      url = bell;
      break;
    case "smokealarm":
      url = smokealarm;
      break;
    case "chimes":
      url = chimes;
      break;
    case "harp":
      url = harp;
      break;
    case "messagepop":
      url = messagepop;
      break;
    default:
      url = gameitem;
  }
  const [isPlaying, setPlaying] = useAppStoreProperty(
    instancekey + "-soundalarm-playing"
  );

  const [, { play, pause }] = useAudio(url, { volume, loop });

  useMQTTSubscribe(
    subtopic,
    ({ message }: MQTTMessage) => setPlaying(FORMAT.toDisplay(message)),
    suboptions
  );

  useEffect(() => {
    isPlaying === "1" ? play() : pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => pause, []);
  return <></>;
};

export default SoundAlarmUnit;
