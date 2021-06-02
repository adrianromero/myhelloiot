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
import { arcpath, padvalue } from "./svgdraw";
import "./ControlGauge.css";

export type ControlGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  labelstep?: number;
  min?: number;
  max?: number;
  step?: number;
  startangle?: number;
  endangle?: number;
};

const ControlGauge: React.FC<ControlGaugeProps> = ({
  value,
  valueformat,
  title = "",
  className = "",
  min = 0,
  max = 100,
  startangle = 180,
  endangle = 360,
}) => {
  const locale = navigator.language;
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  const r1 = 45;
  const centerx = 100;
  const centery = 80;

  const arctotal = endangle - startangle;
  const arctotalrad = (Math.PI * r1 * arctotal) / 180;

  let arcvalue: number;
  let arcvaluerad: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    arcvalue = 0;
    arcvaluerad = 0;
    formatvalue = "";
  } else {
    arcvalue = padvalue(min, max, arctotal)(value);
    arcvaluerad = padvalue(min, max, arctotalrad)(value);
    formatvalue = intlvalue.format(value);
  }
  arcvalue += startangle - 270;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 200 130"
      className={className}
    >
      <path
        id="arc"
        d={arcpath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (startangle * Math.PI) / 180,
          end: (endangle * Math.PI) / 180,
          orientation: 0,
          sweep: 1,
        })}
        className="control-indicator-background"
        style={{
          fill: "#00000000",
          strokeMiterlimit: 0,
        }}
      />
      <path
        id="arc2"
        d={arcpath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (startangle * Math.PI) / 180,
          end: (endangle * Math.PI) / 180,
          orientation: 0,
          sweep: 1,
        })}
        className="control-indicator-bar"
        style={{
          fill: "#00000000",
          strokeMiterlimit: 0,
          strokeDasharray: `${arcvaluerad} 400`,
        }}
      />
      <text
        x={100}
        y={105}
        textAnchor="middle"
        className="control-indicator-value"
      >
        {formatvalue}
      </text>
      <text
        x={centerx}
        y={15}
        textAnchor="middle"
        className="control-indicator-title"
      >
        {title}
      </text>
      <path
        // d="M 1 10 L -1 10  L -1 -55 L 0 -60 L 1 -55 Z"
        d="M 5 5 L 0 10 L -5 5 L 0 -65  Z"
        className="control-indicator-arrow"
        style={{
          transform: `translate(${centerx}px, ${centery}px) rotate(${arcvalue}deg)`,
        }}
      />
    </svg>
  );
};

export default ControlGauge;
