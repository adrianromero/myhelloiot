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

export type Arc = {
    key?: string;
    start: number;
    end: number;
    r: number;
    className?: string;
    style?: React.CSSProperties;
};

export type ArcsProps = {
    arcs: Arc[];
    min: number;
    max: number;
    centerx: number;
    centery: number;
    startangle: number;
    endangle: number;
};

const Arcs: React.FC<ArcsProps> = ({
    arcs,
    min,
    max,
    centerx,
    centery,
    startangle,
    endangle,
}) => (
    <>
        {arcs.map(arc => {
            const arctotal = endangle - startangle;
            const arcstart =
                padvalue(min, max, arctotal)(arc.start) + startangle;
            const arcend = padvalue(min, max, arctotal)(arc.end) + startangle;
            return (
                <path
                    id="arc"
                    key={arc.key}
                    d={arcpath({
                        cx: centerx,
                        cy: centery,
                        r: arc.r,
                        start: radians(arcstart),
                        end: radians(arcend),
                        orientation: arcend - arcstart > 180 ? 1 : 0,
                        sweep: 1,
                    })}
                    className={arc.className}
                    style={arc.style}
                />
            );
        })}
    </>
);

export default Arcs;
