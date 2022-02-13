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
import { StarFilled, StarTwoTone } from "@ant-design/icons";
import {
  IconFormat,
  IconValueFormat,
  ValueFormat,
  ToIconValueFormat,
} from "./FormatTypes";
import { StringIconFormat } from "./IconFormat";
import { SwitchValueFormat, StringValueFormat } from "./ValueFormat";

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
  iconformat: IconFormat = StringIconFormat()
): IconValueFormat => ToIconValueFormat(SwitchValueFormat(), iconformat);

export const StringIconValueFormat = (): IconValueFormat =>
  ToIconValueFormat(StringValueFormat());
