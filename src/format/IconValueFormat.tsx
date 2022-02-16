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

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faStar, faBolt } from "@fortawesome/free-solid-svg-icons";
import { IconValueFormat, ValueFormat, ToIconValueFormat } from "./FormatTypes";
import { SwitchValueFormat, StringValueFormat } from "./ValueFormat";

export type SwitchIconValueFormatProps = {
  icon?: IconProp;
  format?: ValueFormat;
};

export const SwitchIconValueFormat = (
  props: SwitchIconValueFormatProps = {}
): IconValueFormat => {
  const { icon, format } = {
    icon: faLightbulb,
    format: SwitchValueFormat(),
    ...props,
  };
  return {
    ...format,
    toIcon: (b: Buffer) =>
      b.equals(format.fromDisplay("ON")) ? (
        <FontAwesomeIcon
          className="anticon"
          icon={icon}
          style={{
            fontSize: "180%",
            color: "yellow",
            stroke: "darkgray",
            strokeWidth: "16px",
          }}
        />
      ) : (
        <FontAwesomeIcon
          className="anticon"
          icon={icon}
          style={{
            fontSize: "180%",
            color: "#dcdcdc",
            stroke: "darkgray",
            strokeWidth: "16px",
          }}
        />
      ),
  };
};
export const BulbIconValueFormat = SwitchIconValueFormat;
export const ThuderboltIconValueFormat = () =>
  SwitchIconValueFormat({ icon: faBolt });
export const StarIconValueFormat = () =>
  SwitchIconValueFormat({ icon: faStar });

export const StringIconValueFormat = (): IconValueFormat =>
  ToIconValueFormat(StringValueFormat());
