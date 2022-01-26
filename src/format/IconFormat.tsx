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

import "./IconFormat.css";

export const DimIconFormat = (): IconFormat => ({
  toIcon: (b: Buffer) => {
    const value = parseInt(b.toString());

    return (
      <div className="myhToIconFormat myhToIconFormat_aligncenter">
        {value ? (
          <BulbFilled
            style={{ fontSize: "280%", color: `hsl(60, ${value}%, 60%)` }}
          />
        ) : (
          <BulbTwoTone
            style={{ fontSize: "280%" }}
            twoToneColor="hsl(60, 0%, 60%)"
          />
        )}
      </div>
    );
  },
});

export const BulbIconFormat = (): IconFormat => ({
  toIcon: (b: Buffer) =>
    b.toString() === "1" ? (
      <BulbFilled style={{ fontSize: "180%", color: "yellow" }} />
    ) : (
      <BulbTwoTone style={{ fontSize: "180%" }} twoToneColor="lightgray" />
    ),
});

export const ThuderboltIconFormat = (): IconFormat => ({
  toIcon: (b: Buffer) =>
    b.toString() === "1" ? (
      <ThunderboltFilled style={{ fontSize: "180%", color: "yellow" }} />
    ) : (
      <ThunderboltTwoTone
        style={{ fontSize: "180%" }}
        twoToneColor="lightgray"
      />
    ),
});

export const ToIconFormat = (format: ValueFormat): IconFormat => ({
  toIcon: (b: Buffer) => (
    <div className={`myhToIconFormat ${format.className()}`}>
      {format.toDisplay(b) || "\u00A0"}
    </div>
  ),
});

export const ToIconValueFormat = (
  valueformat: ValueFormat,
  iconformat: IconFormat = ToIconFormat(valueformat)
): IconValueFormat => ({
  ...valueformat,
  ...iconformat,
});

export const StarIconValueFormat = (format: ValueFormat): IconValueFormat => ({
  ...format,
  toIcon: (b: Buffer) =>
    b.equals(format.fromDisplay("ON")) ? (
      <StarFilled style={{ fontSize: "180%", color: "yellow" }} />
    ) : (
      <StarTwoTone style={{ fontSize: "180%" }} twoToneColor="lightgray" />
    ),
});

export const SwitchIconValueFormat = (
  iconformat: IconFormat = StrIconFormat()
): IconValueFormat => ToIconValueFormat(SwitchValueFormat(), iconformat);

export const LabelIconFormat = (format: ValueFormat): IconFormat => ({
  toIcon: (b: Buffer) => format.toDisplay(b) || "\u00A0",
});

export const LabelIconValueFormat = (format: ValueFormat): IconValueFormat =>
  ToIconValueFormat(format, LabelIconFormat(format));

export const StrIconFormat = (): IconFormat => ToIconFormat(StrValueFormat());

export const StrIconValueFormat = (): IconValueFormat =>
  ToIconValueFormat(StrValueFormat());

export const NumberIconFormat = (
  options?: Intl.NumberFormatOptions
): IconFormat => ToIconFormat(NumberValueFormat(options));
