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
import { padvalue } from "./svgdraw";
import "./LiquidGauge.css";

export type LiquidGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
};

const LiquidGauge: React.FC<LiquidGaugeProps> = ({
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
  const r2 = 52;
  const centerx = 100;
  const centery = 65;

  let yvalue: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    yvalue = NaN;
    formatvalue = "";
  } else {
    yvalue = padvalue(min, max, r2 * 2)(value);
    yvalue = centery + r2 - yvalue;
    formatvalue = intlvalue.format(value);
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 200 130"
      className={className}
    >
      <defs>
        <clipPath id="cut-off-bottom">
          {!isNaN(yvalue) && (
            <rect
              className="liquidgauge-bar"
              x={0}
              y={yvalue}
              width={200}
              height={130}
            />
          )}
        </clipPath>
      </defs>
      <circle
        cx={centerx}
        cy={centery}
        r={r1}
        className="liquidgauge-border"
        style={{ fill: "#00000000" }}
      />

      <text
        id="value1"
        x={100}
        y={65}
        textAnchor="middle"
        className="liquidgauge-value liquidgauge-value_1"
      >
        {formatvalue}
      </text>
      <text
        id="title1"
        x={100}
        y={85}
        textAnchor="middle"
        className="liquidgauge-title liquidgauge-title_1"
      >
        {title}
      </text>
      <g clipPath="url(#cut-off-bottom)">
        <circle
          cx={centerx}
          cy={centery}
          r={r2}
          className="liquidgauge-background"
        />

        <text
          id="value2"
          x={100}
          y={65}
          textAnchor="middle"
          className="liquidgauge-value liquidgauge-value_2"
        >
          {formatvalue}
        </text>
        <text
          id="title2"
          x={100}
          y={85}
          textAnchor="middle"
          className="liquidgauge-title liquidgauge-title_2"
        >
          {title}
        </text>
      </g>
    </svg>
  );
};

export default LiquidGauge;
