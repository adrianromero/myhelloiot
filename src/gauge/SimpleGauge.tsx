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
import { piepath, padvalue, radians } from "./svgdraw";
import Arcs, { Arc } from "./Arcs";
import "./SimpleGauge.css";

const arcsStandard = (min: number, max: number) => [
  {
    start: min,
    end: min + (max - min) / 6,
    r: 40,
    style: {
      strokeWidth: 30,
      strokeLineCap: "butt",
      stroke: "green",
      filter: "brightness(0.8)",
    },
  },
  {
    start: min + (max - min) / 6,
    end: min + (2 * (max - min)) / 6,
    r: 40,
    style: {
      strokeWidth: 30,
      strokeLineCap: "butt",
      stroke: "green",
      filter: "brightness(1)",
    },
  },
  {
    start: min + (2 * (max - min)) / 6,
    end: min + (3 * (max - min)) / 6,
    r: 40,
    style: {
      strokeWidth: 30,
      strokeLineCap: "butt",
      stroke: "green",
      filter: "brightness(1.2)",
    },
  },
  {
    start: min + (3 * (max - min)) / 6,
    end: min + (4 * (max - min)) / 6,
    r: 40,
    style: {
      strokeWidth: 30,
      strokeLineCap: "butt",
      stroke: "green",
      filter: "brightness(1.4)",
    },
  },
  {
    start: min + (4 * (max - min)) / 6,
    end: min + (5 * (max - min)) / 6,
    r: 40,
    style: {
      strokeWidth: 30,
      strokeLineCap: "butt",
      stroke: "green",
      filter: "brightness(1.6)",
    },
  },
  {
    start: min + (5 * (max - min)) / 6,
    end: max,
    r: 40,
    style: {
      strokeWidth: 30,
      strokeLineCap: "butt",
      stroke: "green",
      filter: "brightness(1.8)",
    },
  },
];

export type SimpleGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  min?: number;
  max?: number;
  startangle?: number;
  endangle?: number;
  arcs?: Arc[];
};

const SimpleGauge: React.FC<SimpleGaugeProps> = ({
  value,
  valueformat,
  title = "",
  className = "",
  min = 0,
  max = 100,
  startangle = 135,
  endangle = 405,
  arcs,
}) => {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale);
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  const r1 = 55;
  const angler2 = radians(15);
  const sinr2 = Math.sin(angler2);
  const cosr2 = Math.cos(angler2);
  const r2 = 25;
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

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 200 130"
      className={className}
    >
      <Arcs
        arcs={arcs ?? arcsStandard(min, max)}
        min={min}
        max={max}
        centerx={centerx}
        centery={centery}
        startangle={startangle}
        endangle={endangle}
      />
      <path
        id="arc"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: radians(startangle),
          end: radians(endangle),
          orientation: arctotal > 180 ? 1 : 0,
          sweep: 1,
        })}
        className="simple-indicator-mark"
        style={{ fill: "#00000000" }}
      />

      <text
        x={centerx + (r1 + 16) * Math.cos(radians(startangle))}
        y={centery + (r1 + 16) * Math.sin(radians(startangle))}
        textAnchor="middle"
        className="simple-indicator-labels"
      >
        {intl.format(min)}
      </text>
      <text
        x={centerx + (r1 + 16) * Math.cos(radians(endangle))}
        y={centery + (r1 + 16) * Math.sin(radians(endangle))}
        textAnchor="middle"
        className="simple-indicator-labels"
      >
        {intl.format(max)}
      </text>

      {isNaN(arcvalue) ? (
        <circle
          id="arcindicatorempty"
          cx={centerx}
          cy={centery}
          r={r2}
          className="simple-indicator-arrow"
        />
      ) : (
        <path
          id="arcindicator"
          d={`M${centerx - sinr2 * r2} ${
            centery - cosr2 * r2
          } A ${r2} ${r2} 0 1 0 ${centerx + sinr2 * r2} ${
            centery - cosr2 * r2
          } L ${centerx} ${centery - 45} Z`}
          opacity="1"
          className="simple-indicator-arrow"
          style={{
            transform: `translate(${centerx}px, ${centery}px) rotate(${arcvalue}deg) translate(${-centerx}px, ${-centery}px)`,
          }}
        />
      )}

      <text
        x={centerx}
        y={centery + 5}
        textAnchor="middle"
        className="simple-indicator-value"
      >
        {formatvalue}
      </text>
      <text
        x={100}
        y={110}
        textAnchor="middle"
        className="simple-indicator-title"
      >
        {title}
      </text>
    </svg>
  );
};

export default SimpleGauge;
