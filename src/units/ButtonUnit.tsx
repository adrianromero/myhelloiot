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

import React from "react";
import { IClientPublishOptions, IClientSubscribeOptions } from "mqtt/dist/mqtt";
import { IconValueFormat } from "../format/FormatTypes";
import { SwitchIconValueFormat } from "../format/IconValueFormat";
import ButtonTopic from "./ButtonTopic";

export type ButtonUnitProps = {
  pubtopic?: string;
  subtopic?: string;
  puboptions?: IClientPublishOptions;
  suboptions?: IClientSubscribeOptions;
  icon?: React.ReactNode;
  format?: IconValueFormat;
  className?: string;
  children?: React.ReactNode;
};

const ButtonUnit: React.FC<ButtonUnitProps> = ({
  pubtopic = "",
  subtopic = "",
  puboptions,
  suboptions,
  format = SwitchIconValueFormat(),
  icon,
  className = "",
  children,
}) => {
  return (
    <ButtonTopic
      pubtopic={pubtopic}
      subtopic={subtopic}
      puboptions={puboptions}
      suboptions={suboptions}
      format={format}
      className={className}
      icon={icon}
      iconlabel={format.toIcon}
    >
      {children}
    </ButtonTopic>
  );
};
export default ButtonUnit;
