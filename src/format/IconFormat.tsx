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

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import SVGIcon from "./SVGIcon";
import { faLightbulb, faStar, faBolt } from "@fortawesome/free-solid-svg-icons";
import {
  IconFormat,
  ValueFormat,
  ToIconFormat,
  ONOFF,
  onoffnum,
} from "./FormatTypes";
import {
  NumberValueFormat,
  NumberValueFormatOptions,
  StringValueFormat,
} from "./ValueFormat";

import "./FormatTypes.css";

export const DimIconFormat = (
  icon: IconDefinition = faLightbulb
): IconFormat => ({
  toIcon: (b: Buffer) => {
    const value = parseInt(b.toString());

    return (
      <div className="myhToIconFormat myhToIconFormat_aligncenter">
        {value ? (
          <SVGIcon
            icon={icon}
            style={{
              fontSize: "280%",
              color: `hsl(60, ${value}%, 60%)`,
              stroke: "darkgray",
              strokeWidth: "16px",
            }}
          />
        ) : (
          <SVGIcon
            icon={icon}
            style={{
              fontSize: "280%",
              color: "hsl(60, 0%, 60%)",
              stroke: "darkgray",
              strokeWidth: "16px",
            }}
          />
        )}
      </div>
    );
  },
});

export type SwitchIconFormatProps = {
  icon?: IconDefinition;
  onoff?: ONOFF;
};

export const SwitchIconFormat = (props?: SwitchIconFormatProps): IconFormat => {
  const { icon, onoff } = { icon: faLightbulb, onoff: onoffnum, ...props };
  return {
    toIcon: (b: Buffer) =>
      onoff.on.equals(b) ? (
        <SVGIcon
          icon={icon}
          style={{
            fontSize: "180%",
            color: "yellow",
            stroke: "darkgray",
            strokeWidth: "16px",
          }}
        />
      ) : (
        <SVGIcon
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
export const BulbIconFormat = SwitchIconFormat;
export const ThuderboltIconFormat = () => SwitchIconFormat({ icon: faBolt });
export const StarIconFormat = () => SwitchIconFormat({ icon: faStar });

export const StringIconFormat = (
  valueformat: ValueFormat = StringValueFormat()
): IconFormat => ToIconFormat(valueformat);

export const NumberIconFormat = (
  options?: NumberValueFormatOptions
): IconFormat => ToIconFormat(NumberValueFormat(options));

export type MapBuffer = (b: Buffer) => Buffer;

export const MapJSONBuffer =
  (map: (m: any) => any): MapBuffer =>
  (b: Buffer) => {
    try {
      const json = JSON.parse(b.toString());
      return Buffer.from(String(map(json)));
    } catch (e) {
      return Buffer.from("");
    }
  };

export const MapIconFormat = (
  map: MapBuffer,
  format: IconFormat = StringIconFormat()
): IconFormat => ({
  toIcon: (b: Buffer) => format.toIcon(map(b)),
});

export const MapJSONIconFormat = (
  mapjson: (m: any) => any,
  format: IconFormat = StringIconFormat()
): IconFormat => MapIconFormat(MapJSONBuffer(mapjson), format);
