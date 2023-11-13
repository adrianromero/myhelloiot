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
import { piepath, padvalue, radians } from "./svgdraw";
import type { GaugeProps } from "./GaugeTypes";
import { DefaultGaugeFormat } from "./GaugeConstants";
import Arcs, { Arc } from "./Arcs";
import "./SimpleGauge.css";

const arcsSimpleGauge = (
  min: number,
  max: number,
  arcs: number = 6
): Arc[] =>
  Array.from(Array(arcs).keys()).map((i) => ({
    key: String(i),
    start: min + (i * (max - min)) / arcs,
    end: min + ((i + 1) * (max - min)) / arcs,
    r: 40,
    className: "simplegauge-section",
    style: {
      stroke: `hsl(240deg 75% ${40 + (40 * i) / arcs}%)`,
      fill: "transparent",
    },
  }));

export type SimpleGaugeProps = {
  value?: number;
  title?: string;
  className?: string;
  startangle?: number;
  endangle?: number;
  arcs?: Arc[];
} & GaugeProps;

const SimpleGauge: React.FC<SimpleGaugeProps> = ({
  value,
  title = "",
  className = "",
  startangle = 135,
  endangle = 405,
  arcs,
  min = 0,
  max = 100,
  format = DefaultGaugeFormat
}) => {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale);

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
    formatvalue = format(value);
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 200 130"
    >
      <g className={className}>
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
          className="simplegauge-background"
        />
        <Arcs
          arcs={arcs ?? arcsSimpleGauge(min, max, 8)}
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
          className="simplegauge-mark"
        />

        <text
          x={centerx + (r1 + 16) * Math.cos(radians(startangle))}
          y={centery + (r1 + 16) * Math.sin(radians(startangle))}
          textAnchor="middle"
          className="simplegauge-labels"
        >
          {intl.format(min)}
        </text>
        <text
          x={centerx + (r1 + 16) * Math.cos(radians(endangle))}
          y={centery + (r1 + 16) * Math.sin(radians(endangle))}
          textAnchor="middle"
          className="simplegauge-labels"
        >
          {intl.format(max)}
        </text>

        {isNaN(arcvalue) ? (
          <circle
            id="arcindicatorempty"
            cx={centerx}
            cy={centery}
            r={r2}
            className="simplegauge-arrow"
          />
        ) : (
          <path
            id="arcindicator"
            d={`M${centerx - sinr2 * r2} ${centery - cosr2 * r2
              } A ${r2} ${r2} 0 1 0 ${centerx + sinr2 * r2} ${centery - cosr2 * r2
              } L ${centerx} ${centery - 45} Z`}
            opacity="1"
            className="simplegauge-arrow"
            style={{
              transform: `translate(${centerx}px, ${centery}px) rotate(${arcvalue}deg) translate(${-centerx}px, ${-centery}px)`,
            }}
          />
        )}

        <text
          x={centerx}
          y={centery + 5}
          textAnchor="middle"
          className="simplegauge-value"
        >
          {formatvalue}
        </text>
        <text x={100} y={110} textAnchor="middle" className="simplegauge-title">
          {title}
        </text>
      </g>
    </svg>
  );
};

export default SimpleGauge;
