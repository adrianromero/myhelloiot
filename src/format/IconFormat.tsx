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
} from "@ant-design/icons";
import { IconFormat, ValueFormat, ToIconFormat } from "./FormatTypes";
import { NumberValueFormat, StringValueFormat } from "./ValueFormat";

import "./FormatTypes.css";

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

export const StringIconFormat = (
  valueformat: ValueFormat = StringValueFormat()
): IconFormat => ToIconFormat(valueformat);

export const NumberIconFormat = (
  options?: Intl.NumberFormatOptions
): IconFormat => ToIconFormat(NumberValueFormat(options));
