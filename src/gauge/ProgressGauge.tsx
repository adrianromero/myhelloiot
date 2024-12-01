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
import { padvalue } from "./svgdraw";
import type { GaugeProps } from "./GaugeTypes";
import { DefaultGaugeFormat } from "./GaugeConstants";
import Sections, { Section } from "./Sections";
import "./ProgressGauge.css";

// const sectionstest: Section[] = [
//   {
//     start: -10,
//     end: 40,
//     len: 26,
//     style: {
//       strokeWidth: 2,
//       strokeLinecap: "butt",
//       stroke: "blue",
//       fill: "#00000000",
//     },
//   },
//   {
//     start: 40,
//     end: 60,
//     len: 26,
//     style: {
//       strokeWidth: 2,
//       strokeLinecap: "butt",
//       stroke: "lightgreen",
//       fill: "#00000000",
//     },
//   },
// ];

export type ProgressGaugeProps = {
    value?: number;
    title?: string;
    className?: string;
    sections?: Section[];
} & GaugeProps;

const ProgressGauge: React.FC<ProgressGaugeProps> = ({
    value,
    title = "",
    className = "",
    sections = [],
    min = 0,
    max = 100,
    format = DefaultGaugeFormat,
}) => {
    let width: number;
    let formatvalue: string;
    if (typeof value === "undefined" || isNaN(value)) {
        width = NaN;
        formatvalue = "";
    } else {
        width = padvalue(min, max, 160)(value);
        formatvalue = format(value);
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 200 30"
        >
            <g className={className}>
                <line
                    x1={20}
                    y1={20}
                    x2={180}
                    y2={20}
                    className="progressgauge-background"
                />
                <Sections
                    sections={sections}
                    min={min}
                    max={max}
                    start={20}
                    len={160}
                />
                {!isNaN(width) && (
                    <line
                        x1={20}
                        y1={20}
                        x2={180}
                        y2={20}
                        className="progressgauge-bar"
                        style={{
                            fill: "#00000000",
                            strokeMiterlimit: 0,
                            strokeDasharray: `${width} 400`,
                        }}
                    />
                )}

                <text
                    x={180}
                    y={12}
                    textAnchor="end"
                    className="progressgauge-value"
                >
                    {formatvalue}
                </text>
                <text
                    x={20}
                    y={10}
                    textAnchor="start"
                    className="progressgauge-title"
                >
                    {title}
                </text>
            </g>
        </svg>
    );
};

export default ProgressGauge;
