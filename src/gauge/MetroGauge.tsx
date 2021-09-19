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
import { arcpath, padvalue, radians } from "./svgdraw";
import Arcs, { Arc } from "./Arcs";
import "./MetroGauge.css";

// const arcstest: Arc[] = [
//   {
//     start: 0,
//     end: 10,
//     r: 50,
//     style: {
//       strokeWidth: 10,
//       strokeLinecap: "butt",
//       stroke: "yellow",
//       fill: "#00000000",
//     },
//   },
//   {
//     start: -10,
//     end: 0,
//     r: 50,
//     style: {
//       strokeWidth: 10,
//       strokeLinecap: "butt",
//       stroke: "#FF4444",
//       fill: "#00000000",
//     },
//   },
// ];

export type MetroGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  labelstep?: number;
  startangle?: number;
  endangle?: number;
  arcs?: Arc[];
};

const MetroGauge: React.FC<MetroGaugeProps> = ({
  value,
  valueformat,
  title = "",
  className = "",
  min = 0,
  max = 100,
  step = 2,
  labelstep = 5,
  startangle = 135,
  endangle = 405,
  arcs = [],
}) => {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale);
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  const r1 = 55;
  const centerx = 100;
  const centery = 65;

  const arctotal = endangle - startangle;

  let arcvalue: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    arcvalue = NaN;
    formatvalue = "";
  } else {
    arcvalue = padvalue(min, max, arctotal)(value);
    arcvalue += startangle - 270;
    formatvalue = intlvalue.format(value);
  }

  const lines = [];
  for (let index = min; index <= max; index += step) {
    const angle = radians(
      startangle - 360 + (arctotal * (index - min)) / (max - min)
    );
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    lines.push(
      <line
        key={`la-${index}`}
        x1={centerx + r1 * cos}
        y1={centery + r1 * sin}
        x2={centerx + (r1 - 3) * cos}
        y2={centery + (r1 - 3) * sin}
        className="metrogauge-mark"
      />
    );
  }
  for (let index = min; index <= max; index += labelstep) {
    const angle = radians(
      startangle - 360 + (arctotal * (index - min)) / (max - min)
    );
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    lines.push(
      <line
        key={`lb-${index}`}
        x1={centerx + r1 * cos}
        y1={centery + r1 * sin}
        x2={centerx + (r1 - 6) * cos}
        y2={centery + (r1 - 6) * sin}
        className="metrogauge-markstep"
      />
    );
    lines.push(
      <text
        key={`t-${index}`}
        x={centerx + (r1 - 13) * cos}
        y={centery + 2 + (r1 - 13) * sin}
        textAnchor="middle"
        className="metrogauge-marklabel"
      >
        {intl.format(index)}
      </text>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 200 130"
      className={className}
    >
      <Arcs
        arcs={arcs}
        min={min}
        max={max}
        centerx={centerx}
        centery={centery}
        startangle={startangle}
        endangle={endangle}
      />
      {lines}
      <path
        id="arc"
        d={arcpath({
          cx: centerx,
          cy: centery,
          r: r1 + 2,
          start: radians(startangle),
          end: radians(endangle),
          orientation: arctotal > 180 ? 1 : 0,
          sweep: 1,
        })}
        className="metrogauge-mark"
        style={{ fill: "#00000000" }}
      />
      <text x={100} y={85} textAnchor="middle" className="metrogauge-value">
        {formatvalue}
      </text>
      <text x={centerx} y={55} textAnchor="middle" className="metrogauge-title">
        {title}
      </text>
      {!isNaN(arcvalue) && (
        <path
          d="M 3 10 L -3 10 L 0 -50 Z"
          className="metrogauge-arrow"
          style={{
            transform: `translate(${centerx}px, ${centery}px) rotate(${arcvalue}deg)`,
          }}
        />
      )}
      <circle
        cx={centerx}
        cy={centery}
        r={1.2}
        className="metrogauge-arrowpin"
      />
    </svg>
  );
};

export default MetroGauge;
