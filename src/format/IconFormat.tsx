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

import {
  BulbTwoTone,
  BulbFilled,
  ThunderboltFilled,
  ThunderboltTwoTone,
  StarFilled,
  StarTwoTone,
} from "@ant-design/icons";
import { IconFormat, IconValueFormat, ValueFormat } from "./FormatTypes";
import {
  NumberValueFormat,
  StrValueFormat,
  SwitchValueFormat,
} from "./ValueFormat";

export function BulbIconFormat(): IconFormat {
  return {
    toIcon: (b: Buffer) =>
      b.toString() === "1" ? (
        <BulbFilled style={{ fontSize: "180%", color: "yellow" }} />
      ) : (
        <BulbTwoTone style={{ fontSize: "180%" }} twoToneColor="lightgray" />
      ),
  };
}

export function StarIconFormat(): IconFormat {
  return {
    toIcon: (b: Buffer) =>
      b.toString() === "1" ? (
        <StarFilled style={{ fontSize: "180%", color: "yellow" }} />
      ) : (
        <StarTwoTone style={{ fontSize: "180%" }} twoToneColor="lightgray" />
      ),
  };
}

export function ThuderboltIconFormat(): IconFormat {
  return {
    toIcon: (b: Buffer) =>
      b.toString() === "1" ? (
        <ThunderboltFilled style={{ fontSize: "180%", color: "yellow" }} />
      ) : (
        <ThunderboltTwoTone
          style={{ fontSize: "180%" }}
          twoToneColor="lightgray"
        />
      ),
  };
}

export function ToIconFormat(format: ValueFormat): IconFormat {
  return {
    toIcon: (b: Buffer) => (
      <div className={`myh-value myh-value-padding ${format.className()}`}>
        {format.toDisplay(b) || "\u00A0"}
      </div>
    ),
  };
}

export function ToIconValueFormat(
  valueformat: ValueFormat,
  iconformat: IconFormat = ToIconFormat(valueformat)
): IconValueFormat {
  return {
    ...valueformat,
    ...iconformat,
  };
}

export function SwitchIconValueFormat(
  iconformat: IconFormat = StrIconFormat()
): IconValueFormat {
  return ToIconValueFormat(SwitchValueFormat(), iconformat);
}

export function LabelIconFormat(format: ValueFormat): IconFormat {
  return {
    toIcon: (b: Buffer) => format.toDisplay(b) || "\u00A0",
  };
}

export function LabelIconValueFormat(format: ValueFormat): IconValueFormat {
  return ToIconValueFormat(format, LabelIconFormat(format));
}

export function StrIconFormat(): IconFormat {
  return ToIconFormat(StrValueFormat());
}

export function StrIconValueFormat(): IconValueFormat {
  return ToIconValueFormat(StrValueFormat());
}

export function NumberIconFormat(
  options?: Intl.NumberFormatOptions
): IconFormat {
  return ToIconFormat(NumberValueFormat(options));
}
