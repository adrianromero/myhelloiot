/*
MYHELLOIOT
Copyright (C) 2021-2024 Adrián Romero
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

import { Buffer } from "buffer";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import SVGIcon from "./SVGIcon";
import { faLightbulb, faStar, faMoon } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb as faLightbulbRegular, faStar as faStarRegular, faMoon as faMoonRegular } from "@fortawesome/free-regular-svg-icons";
import {
  IconFormat,
  ValueFormat,
  ToIconFormat,
  ONOFF,
  LimitsFormat,
} from "./FormatTypes";
import { ONOFFNumber } from "./FormatConstants";
import {
  NumberValueFormat,
  NumberValueFormatOptions,
  StringValueFormat,
} from "./ValueFormat";

import "./FormatTypes.css";

export const DimIconFormat = (props:
  { icon?: IconDefinition } & Partial<LimitsFormat>
  = { icon: faLightbulb }
): IconFormat => ({
  toIcon: (b: Buffer) => {
    const value = parseInt(b.toString());
    const { icon = faLightbulb, min = 0, max = 100 } = props;

    return (
      <div className="myhToIconFormat myhToIconFormat_aligncenter">
        {value ? (
          <SVGIcon
            icon={icon}
            className="dimicon-on"
            style={{
              filter: `saturate(${100.0 * (value - min) / (max - min)}%`,
            }}
          />
        ) : (
          <SVGIcon
            icon={icon}
            className="dimicon-off"
          />
        )}
      </div>
    );
  },
});

export type SwitchIconFormatProps = {
  icon: IconDefinition;
  iconoff: IconDefinition;
  onoff?: ONOFF;
};

export const SwitchIconFormat = (props?: SwitchIconFormatProps): IconFormat => {
  const { icon, iconoff, onoff } = { icon: faLightbulb, iconoff: faLightbulbRegular, onoff: ONOFFNumber, ...props };
  return {
    toIcon: (b: Buffer) =>
      onoff.status_on(b) ? (
        <SVGIcon
          icon={icon}
          className="icon-on"
        />
      ) : (
        <SVGIcon
          icon={iconoff}
          className="icon-off"
        />
      ),
  };
};
export const BulbIconFormat = SwitchIconFormat;
export const MoonIconFormat = () => SwitchIconFormat({ icon: faMoon, iconoff: faMoonRegular });
export const StarIconFormat = () => SwitchIconFormat({ icon: faStar, iconoff: faStarRegular });

export const StringIconFormat = (
  valueformat: ValueFormat = StringValueFormat()
): IconFormat => ToIconFormat(valueformat);

export const NumberIconFormat = (
  options?: NumberValueFormatOptions
): IconFormat => ToIconFormat(NumberValueFormat(options));

export type MapBuffer = (b: Buffer) => Buffer;

export const MapJSONBuffer =
  (map: (m: unknown) => unknown): MapBuffer =>
    (b: Buffer) => {
      try {
        const json = JSON.parse(b.toString());
        return Buffer.from(String(map(json)));
      } catch (error) {
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
  mapjson: (m: unknown) => unknown,
  format: IconFormat = StringIconFormat()
): IconFormat => MapIconFormat(MapJSONBuffer(mapjson), format);
