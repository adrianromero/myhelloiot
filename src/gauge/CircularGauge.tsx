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
import { padvalue, radians } from "./svgdraw";
import "./CircularGauge.css";

export type CircularGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
};

const CircularGauge: React.FC<CircularGaugeProps> = ({
  value,
  valueformat,
  title = "",
  className = "",
  min = 0,
  max = 100,
}) => {
  const locale = navigator.language;
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  const r1 = 55;
  const centerx = 100;
  const centery = 65;

  let arcvalue: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    arcvalue = 0;
    formatvalue = "";
  } else {
    arcvalue = padvalue(min, max, r1 * radians(360))(value);
    formatvalue = intlvalue.format(value);
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 200 130"
      className={className}
    >
      <circle
        cx={centerx}
        cy={centery}
        r={r1}
        className="circular-indicator-background"
        style={{
          fill: "#00000000",
          strokeMiterlimit: 0,
        }}
      />
      <circle
        cx={centerx}
        cy={centery}
        r={r1}
        className="circular-indicator-bar"
        style={{
          fill: "#00000000",
          strokeMiterlimit: 0,
          strokeDasharray: `${arcvalue} 400`,
          transform: `translate(${centerx}px, ${centery}px) rotate(-90deg) translate(${-centerx}px, ${-centery}px)`,
        }}
      />
      <text
        x={100}
        y={65}
        textAnchor="middle"
        className="circular-indicator-value"
      >
        {formatvalue}
      </text>
      <text
        x={100}
        y={85}
        textAnchor="middle"
        className="circular-indicator-title"
      >
        {title}
      </text>
    </svg>
  );
};

export default CircularGauge;
