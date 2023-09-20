/*
MYHELLOIOT
Copyright (C) 2022-2023 Adrián Romero
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

export type SVGIconProps = {
  icon: IconDefinition;
  className?: string;
  style?: React.CSSProperties;
};

const SVGIcon: React.FC<SVGIconProps> = ({
  icon,
  className = "",
  style = {},
}) => (
  <span role="img" className={`anticon ${className}`} style={style}>
    <FontAwesomeIcon icon={icon} />
  </span>
);

export default SVGIcon;
