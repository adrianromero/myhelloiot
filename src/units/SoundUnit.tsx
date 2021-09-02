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
const bell = require("../assets/media/486952_6657415-lq.mp3").default;

type SoundUnitProps = {
  subtopic: string;
  suboptions?: IClientSubscribeOptions;
};

const SoundUnit: React.FC<SoundUnitProps> = ({ subtopic, suboptions }) => {
  const [, { play }] = useAudio(bell);

  useMQTTSubscribe(
    subtopic,
    ({ message }: MQTTMessage) => {
      play();
    },
    suboptions
  );

  return <></>;
};

export default SoundUnit;
