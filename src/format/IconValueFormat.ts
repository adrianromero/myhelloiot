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

import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faStar, faBolt } from "@fortawesome/free-solid-svg-icons";
import {
  IconValueFormat,
  ToIconValueFormat,
  ONOFF,
  LimitsFormat,
  NumberFormat,
  ToIconFormat,
} from "./FormatTypes";
import { SwitchIconFormat } from "./IconFormat";
import {
  SwitchValueFormat,
  StringValueFormat,
  NumberValueFormat,
  NumberValueFormatOptions,
} from "./ValueFormat";

export type SwitchIconValueFormatProps = {
  icon?: IconDefinition;
  onoff?: ONOFF;
};
export const SwitchIconValueFormat = (
  props?: SwitchIconValueFormatProps
): IconValueFormat =>
  ToIconValueFormat(SwitchValueFormat(props), SwitchIconFormat(props));
export const BulbIconValueFormat = SwitchIconValueFormat;
export const ThuderboltIconValueFormat = () =>
  SwitchIconValueFormat({ icon: faBolt });
export const StarIconValueFormat = () =>
  SwitchIconValueFormat({ icon: faStar });

export const StringIconValueFormat = (): IconValueFormat =>
  ToIconValueFormat(StringValueFormat());

export const NumberIconValueFormat = (
  options?: NumberValueFormatOptions
): IconValueFormat & LimitsFormat & NumberFormat => {
  const valueformat = NumberValueFormat(options);
  const iconformat = ToIconFormat(valueformat);
  return {
    ...valueformat,
    ...iconformat,
  };
};

export const Celsius = (limits: Partial<LimitsFormat>) =>
  NumberIconValueFormat({
    style: "unit",
    unit: "celsius",
    min: -10,
    max: 60,
    step: 1,
    ...limits,
  });

export const Fahrenheit = (limits: Partial<LimitsFormat>) =>
  NumberIconValueFormat({
    style: "unit",
    unit: "fahrenheit",
    min: 14,
    max: 140,
    step: 1,
    ...limits,
  });

export const KilometerPerHour = (limits: Partial<LimitsFormat>) =>
  NumberIconValueFormat({
    style: "unit",
    unit: "kilometer-per-hour",
    min: 0,
    max: 180,
    step: 10,
    ...limits,
  });

export const Percent = (limits: Partial<LimitsFormat>) =>
  NumberIconValueFormat({
    style: "unit",
    unit: "percent",
    min: 0,
    max: 100,
    step: 1,
    ...limits,
  });
