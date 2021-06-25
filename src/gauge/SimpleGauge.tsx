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
import "./SimpleGauge.css";

export type SimpleGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  min?: number;
  max?: number;
};

const SimpleGauge: React.FC<SimpleGaugeProps> = ({
  value,
  valueformat,
  title = "",
  className = "",
  min = 0,
  max = 100,
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

  let angle: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    angle = NaN;
    formatvalue = "";
  } else {
    angle = padvalue(min, max, 270)(value);
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
        id="pie1"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: radians(181),
          end: radians(135),
        })}
        className="simple-indicator-pie"
        style={{
          filter: "brightness(0.50)",
        }}
      />
      <path
        id="pie2"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: radians(226),
          end: radians(180),
        })}
        className="simple-indicator-pie"
        style={{
          filter: "brightness(0.60)",
        }}
      />
      <path
        id="pie3"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: radians(271),
          end: radians(225),
        })}
        className="simple-indicator-pie"
        style={{
          filter: "brightness(0.70)",
        }}
      />
      <path
        id="pie4"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: radians(316),
          end: radians(270),
        })}
        className="simple-indicator-pie"
        style={{
          filter: "brightness(0.80)",
        }}
      />
      <path
        id="pie5"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: radians(361),
          end: radians(315),
        })}
        className="simple-indicator-pie"
        style={{
          filter: "brightness(0.90)",
        }}
      />
      <path
        id="pie6"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: radians(46),
          end: radians(0),
        })}
        className="simple-indicator-pie"
        style={{
          filter: "brightness(1)",
        }}
      />

      <path
        id="arc"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: radians(45),
          end: radians(135),
          orientation: 1,
        })}
        className="simple-indicator-mark"
        style={{ fill: "#00000000" }}
      />

      <text
        x={50}
        y={115}
        textAnchor="middle"
        className="simple-indicator-labels"
      >
        {intl.format(min)}
      </text>
      <text
        x={150}
        y={115}
        textAnchor="middle"
        className="simple-indicator-labels"
      >
        {intl.format(max)}
      </text>

      {isNaN(angle) ? (
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
            transform: `translate(${centerx}px, ${centery}px) rotate(${
              angle - 135
            }deg) translate(${-centerx}px, ${-centery}px)`,
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
