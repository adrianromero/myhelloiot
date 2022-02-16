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

import "./FormatTypes.css";

export type IconFormat = {
  toIcon: (b: Buffer) => React.ReactNode;
};

export type ValueFormat = {
  toDisplay: (b: Buffer) => string;
  fromDisplay: (s: string) => Buffer;
  className: () => string;
  next: (b: Buffer) => Buffer;
  prev: (b: Buffer) => Buffer;
};

export type NumberValidation = {
  min?: number;
  max?: number;
  step?: number;
};

export type IconValueFormat = IconFormat & ValueFormat;

export type ONOFF = {
  on: Buffer;
  off: Buffer;
};

export const onoffnum: ONOFF = {
  on: Buffer.from("1"),
  off: Buffer.from("0"),
};

export const onoffst: ONOFF = {
  on: Buffer.from("on"),
  off: Buffer.from("off"),
};

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
