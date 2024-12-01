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

export type Section = {
    key?: string;
    start: number;
    end: number;
    len: number;
    className?: string;
    style?: React.CSSProperties;
};

export type SectionsProps = {
    sections: Section[];
    min: number;
    max: number;
    start: number;
    len: number;
};

const Sections: React.FC<SectionsProps> = ({
    sections,
    min,
    max,
    start,
    len,
}) => (
    <>
        {sections.map(section => {
            return (
                <line
                    key={section.key}
                    x1={start + (len * (section.start - min)) / (max - min)}
                    x2={start + (len * (section.end - min)) / (max - min)}
                    y1={section.len}
                    y2={section.len}
                    className={section.className}
                    style={section.style}
                />
            );
        })}
    </>
);

export default Sections;
