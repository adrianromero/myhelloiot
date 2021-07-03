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

export const piepath: (args: {
  cx: number;
  cy: number;
  r: number;
  start: number;
  end: number;
  orientation?: number;
  sweep?: number;
}) => string = ({ cx, cy, r, start, end, orientation = 0, sweep = 0 }) => {
  return `M${cx + Math.cos(start) * r} ${
    cy + Math.sin(start) * r
  } A ${r} ${r} 1 ${orientation} ${sweep} ${cx + Math.cos(end) * r} ${
    cy + Math.sin(end) * r
  } L ${cx} ${cy} Z`;
};

export const arcpath: (args: {
  cx: number;
  cy: number;
  r: number;
  start: number;
  end: number;
  orientation?: number;
  sweep?: number;
}) => string = ({ cx, cy, r, start, end, orientation = 0, sweep = 0 }) => {
  return `M${cx + Math.cos(start) * r} ${
    cy + Math.sin(start) * r
  } A ${r} ${r} 1 ${orientation} ${sweep} ${cx + Math.cos(end) * r} ${
    cy + Math.sin(end) * r
  }`;
};

export const padvalue: (
  min: number,
  max: number,
  length?: number
) => (value: number) => number =
  (min, max, length = 1) =>
  (value) => {
    let lengthvalue = (length * (value - min)) / (max - min);
    if (lengthvalue < 0) {
      return 0;
    }
    if (lengthvalue > length) {
      return length;
    }
    return lengthvalue;
  };

export function radians(angle: number): number {
  return (angle * Math.PI) / 180;
}
