/*
MYHELLOIOT
Copyright (C) 2023-2024 Adrián Romero
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

export type ConvertBuffer = (b: Buffer) => Buffer;

export const IdentityConvert = () => (b: Buffer) => b;

export const JSONConvert = (c: (json: unknown) => unknown) => (b: Buffer) => {
  try {
    const json = JSON.parse(b.toString());
    const conversion = c(json);
    const convertedjson = JSON.stringify(conversion);
    return Buffer.from(convertedjson);
  } catch (exception) {
    return "ERROR";
  }
};
