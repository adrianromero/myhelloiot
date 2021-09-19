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
import { padvalue, arcpath, radians } from "./svgdraw";
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

  const startangle = 90;
  const endangle = 360;

  const r1 = 50;
  const centerx = 100;
  const centery = 65;

  const arctotal = endangle - startangle;
  const arctotalrad = r1 * radians(arctotal);

  let arcvaluerad: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    arcvaluerad = NaN;
    formatvalue = "";
  } else {
    arcvaluerad = padvalue(min, max, arctotalrad)(value);
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
          start: radians(startangle),
          end: radians(endangle),
          orientation: arctotal > 180 ? 1 : 0,
          sweep: 1,
        })}
        className="spacegauge-background"
        style={{
          fill: "#00000000",
          strokeMiterlimit: 0,
          strokeDasharray: "none",
        }}
      />
      {!isNaN(arcvaluerad) && (
        <path
          id="path2"
          d={arcpath({
            cx: centerx,
            cy: centery,
            r: r1,
            start: radians(startangle),
            end: radians(endangle),
            orientation: arctotal > 180 ? 1 : 0,
            sweep: 1,
          })}
          className="spacegauge-bar"
          style={{
            fill: "#00000000",
            strokeMiterlimit: 0,
            strokeDasharray: `${arcvaluerad} 400`,
          }}
        />
      )}

      <text x={105} y={105} textAnchor="start" className="spacegauge-value">
        {formatvalue}
      </text>
      <text x={105} y={80} textAnchor="start" className="spacegauge-title">
        {title}
      </text>
    </svg>
  );
};

export default SpaceGauge;
