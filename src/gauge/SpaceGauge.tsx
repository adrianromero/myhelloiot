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
import { padvalue, arcpath } from "./svgdraw";
import "./SpaceGauge.css";

export type SpaceGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
};

const SpaceGauge: React.FC<SpaceGaugeProps> = ({
  value,
  valueformat,
  title = "",
  className = "",
  min = 0,
  max = 100,
}) => {
  const locale = navigator.language;
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  const r1 = 50;
  const centerx = 100;
  const centery = 65;

  let arcvalue: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    arcvalue = 0;
    formatvalue = "";
  } else {
    arcvalue = padvalue(min, max, (Math.PI * r1 * 2 * 3) / 4)(value);
    formatvalue = intlvalue.format(value);
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 200 130"
      className={className}
    >
      <path
        id="path1"
        d={arcpath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (90 * Math.PI) / 180,
          end: (0 * Math.PI) / 180,
          orientation: 1,
          sweep: 1,
        })}
        className="space-indicator-background"
        style={{
          fill: "#00000000",
        }}
      />
      <path
        id="path2"
        d={arcpath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (90 * Math.PI) / 180,
          end: (0 * Math.PI) / 180,
          orientation: 1,
          sweep: 1,
        })}
        className="space-indicator-bar"
        style={{
          strokeDasharray: `${arcvalue} 400`,
          fill: "#00000000",
        }}
      />

      <text
        x={105}
        y={105}
        textAnchor="start"
        className="space-indicator-value"
      >
        {formatvalue}
      </text>
      <text x={105} y={80} textAnchor="start" className="space-indicator-title">
        {title}
      </text>
    </svg>
  );
};

export default SpaceGauge;
