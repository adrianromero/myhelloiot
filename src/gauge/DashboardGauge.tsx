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
import "./DashboardGauge.css";

export type DashboardGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  min?: number;
  max?: number;
};

const DashboardGauge: React.FC<DashboardGaugeProps> = ({
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

  const r = 60;

  let arcvalue: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    arcvalue = 0;
    formatvalue = "";
  } else {
    arcvalue = padvalue(min, max, r * radians(90))(value);
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
        id="arc"
        d="M40 85 A 60 60 0 0 1 160 85"
        opacity="1"
        className="dashboard-indicator-background"
        style={{
          fill: "#00000000",
          strokeMiterlimit: 0,
          strokeDasharray: "none",
        }}
      />
      <path
        id="arc"
        d="M40 85 A 60 60 0 0 1 160 85"
        opacity="1"
        className="dashboard-indicator-bar"
        style={{
          fill: "#00000000",
          strokeMiterlimit: 0,
          strokeDasharray: `${arcvalue} 400`,
        }}
      />
      <text
        x={40}
        y={97}
        textAnchor="middle"
        className="dashboard-indicator-labels"
      >
        {intl.format(min)}
      </text>
      <text
        x={160}
        y={97}
        textAnchor="middle"
        className="dashboard-indicator-labels"
      >
        {intl.format(max)}
      </text>
      <text
        x={100}
        y={90}
        textAnchor="middle"
        className="dashboard-indicator-value"
      >
        {formatvalue}
      </text>
      <text
        x={100}
        y={110}
        textAnchor="middle"
        className="dashboard-indicator-title"
      >
        {title}
      </text>
    </svg>
  );
};

export default DashboardGauge;
