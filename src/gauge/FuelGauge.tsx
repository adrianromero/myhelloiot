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
import "./FuelGauge.css";

// arcs:  [{
//   start: -10,
//   end: 10,
//   r: 45,
//   style: {
//     strokeWidth: 20,
//     strokeLinecap: "butt",
//     stroke: "red",
//     fill: "#00000000",
//   },
// }]

export type FuelGaugeProps = {
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
  arcs?: Arc[];
};

const FuelGauge: React.FC<FuelGaugeProps> = ({
  value,
  valueformat,
  title = "",
  className = "",
  min = 0,
  max = 100,
  step = 2,
  labelstep = 5,
  startangle = 200,
  endangle = 340,
  arcs = [],
}) => {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale);
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  const r1 = 55;
  const r2 = 45;
  const centerx = 100;
  const centery = 80;

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
        key={`ma-${index}`}
        x1={centerx + (r1 - 5) * cos}
        y1={centery + (r1 - 5) * sin}
        x2={centerx + (r1 - 10) * cos}
        y2={centery + (r1 - 10) * sin}
        className="fuelgauge-markstep"
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
        key={`mb-${index}`}
        x1={centerx + (r1 - 2) * cos}
        y1={centery + (r1 - 2) * sin}
        x2={centerx + (r1 - 10) * cos}
        y2={centery + (r1 - 10) * sin}
        className="fuelgauge-markstep"
      />
    );
    lines.push(
      <text
        key={`t-${index}`}
        x={centerx + (r1 - 16) * cos}
        y={centery + 2 + (r1 - 16) * sin}
        textAnchor="middle"
        className="fuelgauge-marklabel"
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
          r: r1,
          start: radians(startangle),
          end: radians(endangle),
          orientation: arctotal > 180 ? 1 : 0,
          sweep: 1,
        })}
        className="fuelgauge-mark fuelgauge-mark_ext"
        style={{ fill: "#00000000" }}
      />
      <path
        id="arc"
        d={arcpath({
          cx: centerx,
          cy: centery,
          r: r2,
          start: radians(startangle),
          end: radians(endangle),
          orientation: arctotal > 180 ? 1 : 0,
          sweep: 1,
        })}
        className="fuelgauge-mark fuelgauge-mark_int"
        style={{ fill: "#00000000" }}
      />
      <text x={100} y={105} textAnchor="middle" className="fuelgauge-value">
        {formatvalue}
      </text>
      <text x={centerx} y={15} textAnchor="middle" className="fuelgauge-title">
        {title}
      </text>
      {!isNaN(arcvalue) && (
        <path
          d="M 2 10  L -2 10 L -1.5 -49 L 0 -50 L 1.5 -49 Z"
          className="fuelgauge-arrow"
          style={{
            transform: `translate(${centerx}px, ${centery}px) rotate(${arcvalue}deg)`,
          }}
        />
      )}
      <circle cx={centerx} cy={centery} r={6} className="fuelgauge-arrowpin" />
    </svg>
  );
};

export default FuelGauge;
