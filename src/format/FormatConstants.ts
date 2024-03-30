/*
MYHELLOIOT
Copyright (C) 2023 Adrián Romero
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
import type { ONOFF } from "./FormatTypes";

export const DefaultLimits = { min: 0, max: 100, step: 1 };

export const ONOFFNumber: ONOFF = {
  status_on: (v: Buffer) => v.equals(Buffer.from("1")),
  cmd_on: Buffer.from("1"),
  cmd_off: Buffer.from("0"),
};

export const ONOFFStr: ONOFF = {
  status_on: (v: Buffer) => v.equals(Buffer.from("on")),
  cmd_on: Buffer.from("on"),
  cmd_off: Buffer.from("off"),
};

export const ONOFFShelly2: ONOFF = {
  status_on: (v: Buffer) => {
    if (v.equals(Buffer.from("on"))) {
      return true;
    }
    try {
      const status = JSON.parse(v.toString("utf8"));
      return status.output;
    } catch (e) {
      return false;
    }
  },
  cmd_on: Buffer.from("on"),
  cmd_off: Buffer.from("off"),
};
