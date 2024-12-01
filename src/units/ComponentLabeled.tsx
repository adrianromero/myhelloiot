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
import "./ComponentLabeled.css";

export type ComponentCardProps = {
    label?: string;
};

export const createComponentLabeled =
    <P,>(Unit: React.FC<P>, unitClassSuffix?: string) =>
    (props: P & ComponentCardProps) => {
        const { label } = props;
        return (
            <div
                className={`myhComponentLabeled myhComponentLabeled-${unitClassSuffix}`}
            >
                <div
                    className={`myhComponentLabeled-label myhComponentLabeled-label-${unitClassSuffix}`}
                >
                    {label}
                </div>
                <div
                    className={`myhComponentLabeled-unit myhComponentLabeled-unit-${unitClassSuffix}`}
                >
                    <Unit {...props} />
                </div>
            </div>
        );
    };
