/*
MYHELLOIOT
Copyright (C) 2021-2023 Adrián Romero
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
import { arcpath, padvalue, radians } from "./svgdraw";
import { GaugeProps, defaultGaugeFormat } from "./GaugeTypes";
import Arcs, { Arc } from "./Arcs";
import "./DashboardGauge.css";

// const arcstest: Arc[] = [
//   {
//     start: 0,
//     end: 10,
//     r: 82,
//     style: {
//       strokeWidth: 2,
//       strokeLinecap: "butt",
//       stroke: "blue",
//       fill: "#00000000",
//     },
//   },
//   {
//     start: -10,
//     end: 0,
//     r: 82,
//     style: {
//       strokeWidth: 2,
//       strokeLinecap: "butt",
//       stroke: "#FF4444",
//       fill: "#00000000",
//     },
//   },
// ];

export type DashboardGaugeProps = {
  value?: number;
  title?: string;
  className?: string;
  startangle?: number;
  endangle?: number;
  arcs?: Arc[];
} & GaugeProps;

const DashboardGauge: React.FC<DashboardGaugeProps> = ({
  value,
  title = "",
  className = "",
  startangle = 180,
  endangle = 360,
  arcs = [],
  min = 0,
  max = 100,
  format = defaultGaugeFormat
}) => {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale);

  const r1 = 60;
  const centerx = 100;
  const centery = 85;

  const arctotal = endangle - startangle;
  const arctotalrad = r1 * radians(arctotal);

  let arcvaluerad: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    arcvaluerad = NaN;
    formatvalue = "";
  } else {
    arcvaluerad = padvalue(min, max, arctotalrad)(value);
    formatvalue = format(value);
  }

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
          start: radians(startangle),
          end: radians(endangle),
          orientation: arctotal > 180 ? 1 : 0,
          sweep: 1,
        })}
        className="dashboardgauge-background"
        style={{
          fill: "#00000000",
          strokeMiterlimit: 0,
          strokeDasharray: "none",
        }}
      />
      <Arcs
        arcs={arcs}
        min={min}
        max={max}
        centerx={centerx}
        centery={centery}
        startangle={startangle}
        endangle={endangle}
      />
      {!isNaN(arcvaluerad) && (
        <path
          id="arc2"
          d={arcpath({
            cx: centerx,
            cy: centery,
            r: r1,
            start: radians(startangle),
            end: radians(endangle),
            orientation: arctotal > 180 ? 1 : 0,
            sweep: 1,
          })}
          className="dashboardgauge-bar"
          style={{
            fill: "#00000000",
            strokeMiterlimit: 0,
            strokeDasharray: `${arcvaluerad} 400`,
          }}
        />
      )}
      <text
        x={centerx - 2 + r1 * Math.cos(radians(startangle))}
        y={centery + 12 + r1 * Math.sin(radians(startangle))}
        textAnchor="middle"
        className="dashboardgauge-labels"
      >
        {intl.format(min)}
      </text>
      <text
        x={centerx + 2 + r1 * Math.cos(radians(endangle))}
        y={centery + 12 + r1 * Math.sin(radians(endangle))}
        textAnchor="middle"
        className="dashboardgauge-labels"
      >
        {intl.format(max)}
      </text>
      <text x={100} y={90} textAnchor="middle" className="dashboardgauge-value">
        {formatvalue}
      </text>
      <text
        x={100}
        y={110}
        textAnchor="middle"
        className="dashboardgauge-title"
      >
        {title}
      </text>
    </svg>
  );
};

export default DashboardGauge;
