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

import { Buffer } from "buffer";
import { IconFormat } from "./FormatTypes";
import { VictoryStyleInterface, DomainPropType } from "victory-core";
import { VictoryArea } from "victory";

type ChartIconFormatParameters = {
  style?: VictoryStyleInterface;
  domain?: DomainPropType;
};
export const ChartIconFormat = ({
  style = {
    data: {
      fill: "#0019ac66",
      stroke: "#0019ac",
      strokeWidth: 2,
      strokeLinecap: "round",
    },
  },
  domain = { y: [0, 100] },
}: ChartIconFormatParameters): IconFormat => ({
  toIcon: (b: Buffer) => {
    let data;
    try {
      data = JSON.parse(b.toString());
      if (!Array.isArray(data) || data.length === 0) {
        data = [null];
      }
    } catch (ex) {
      data = [null];
    }

    return (
      <VictoryArea
        width={200}
        height={100}
        padding={2}
        domain={domain}
        style={style}
        interpolation="monotoneX"
        data={data}
      />
    );
  },
});
