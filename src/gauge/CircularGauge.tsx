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
import { padvalue, radians } from "./svgdraw";
import type { GaugeProps } from "./GaugeTypes";
import { DefaultGaugeFormat } from "./GaugeConstants";
import "./CircularGauge.css";

export type CircularGaugeProps = {
    value?: number;
    title?: string;
    className?: string;
} & GaugeProps;

const CircularGauge: React.FC<CircularGaugeProps> = ({
    value,
    title = "",
    className = "",
    min = 0,
    max = 100,
    format = DefaultGaugeFormat,
}) => {
    const r1 = 55;
    const centerx = 100;
    const centery = 65;

    let arcvalue: number;
    let formatvalue: string;
    if (typeof value === "undefined" || isNaN(value)) {
        arcvalue = NaN;
        formatvalue = "";
    } else {
        arcvalue = padvalue(min, max, r1 * radians(360))(value);
        formatvalue = format(value);
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 200 130"
        >
            <g className={className}>
                <circle
                    cx={centerx}
                    cy={centery}
                    r={r1}
                    className="circulargauge-background"
                    style={{
                        fill: "#00000000",
                        strokeMiterlimit: 0,
                    }}
                />
                {!isNaN(arcvalue) && (
                    <circle
                        cx={centerx}
                        cy={centery}
                        r={r1}
                        className="circulargauge-bar"
                        style={{
                            fill: "#00000000",
                            strokeMiterlimit: 0,
                            strokeDasharray: `${arcvalue} 400`,
                            transform: `translate(${centerx}px, ${centery}px) rotate(-90deg) translate(${-centerx}px, ${-centery}px)`,
                        }}
                    />
                )}
                <text
                    x={100}
                    y={65}
                    textAnchor="middle"
                    className="circulargauge-value"
                >
                    {formatvalue}
                </text>
                <text
                    x={100}
                    y={85}
                    textAnchor="middle"
                    className="circulargauge-title"
                >
                    {title}
                </text>
            </g>
        </svg>
    );
};

export default CircularGauge;
