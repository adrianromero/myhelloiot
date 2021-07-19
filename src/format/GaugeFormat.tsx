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
import { IconFormat } from "./FormatTypes";
import LinearGauge from "../gauge/LinearGauge";
import ProgressGauge from "../gauge/ProgressGauge";
import DashboardGauge from "../gauge/DashboardGauge";
import SimpleGauge from "../gauge/SimpleGauge";
import CircularGauge from "../gauge/CircularGauge";
import MetroGauge from "../gauge/MetroGauge";
import SpaceGauge from "../gauge/SpaceGauge";
import LiquidGauge from "../gauge/LiquidGauge";
import DialGauge from "../gauge/DialGauge";
import FuelGauge from "../gauge/FuelGauge";
import ControlGauge from "../gauge/ControlGauge";

export type GaugeIconFormat<GaugeProps> = (
  gaugeprops: GaugeProps,
  valueformat?: Intl.NumberFormatOptions
) => IconFormat;

const CreateGaugesIconFormat =
  <GaugeProps extends unknown>(
    Component: React.FC<GaugeProps>
  ): GaugeIconFormat<GaugeProps> =>
  (gaugeprops: GaugeProps): IconFormat => ({
    toIcon: (buffer) => (
      <Component value={readNumber(buffer)} {...gaugeprops} />
    ),
  });

function readNumber(buffer: Buffer): number | undefined {
  const s: string = buffer.toString();
  return s ? Number(s) : undefined;
}

export const FuelIconFormat = CreateGaugesIconFormat(FuelGauge);
export const ControlIconFormat = CreateGaugesIconFormat(ControlGauge);
export const LinearIconFormat = CreateGaugesIconFormat(LinearGauge);
export const ProgressIconFormat = CreateGaugesIconFormat(ProgressGauge);
export const DashboardIconFormat = CreateGaugesIconFormat(DashboardGauge);
export const SimpleIconFormat = CreateGaugesIconFormat(SimpleGauge);
export const CircularIconFormat = CreateGaugesIconFormat(CircularGauge);
export const MetroIconFormat = CreateGaugesIconFormat(MetroGauge);
export const LiquidIconFormat = CreateGaugesIconFormat(LiquidGauge);
export const DialIconFormat = CreateGaugesIconFormat(DialGauge);
export const SpaceIconFormat = CreateGaugesIconFormat(SpaceGauge);
