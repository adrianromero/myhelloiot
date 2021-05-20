import React from "react";
import { IconFormat, NumberValidation } from "./FormatTypes";
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

export type GaugeProps = {
  title?: string;
  className?: string;
  labelstep?: number;
} & NumberValidation;

type FGaugesIconFormat = (
  gaugeprops: GaugeProps,
  valueformat?: Intl.NumberFormatOptions
) => IconFormat;

export type GaugeComponentProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
} & GaugeProps;

function CreateGaugesIconFormat(
  Component: React.FC<GaugeComponentProps>
): FGaugesIconFormat {
  return (gaugeprops: GaugeProps, valueformat?: Intl.NumberFormatOptions) => ({
    toIcon: (buffer) => (
      <Component
        value={readNumber(buffer)}
        valueformat={valueformat}
        {...gaugeprops}
      />
    ),
  });
}

function readNumber(buffer: Buffer): number | undefined {
  const s: string = buffer.toString();
  return s ? Number(s) : undefined;
}

export const FuelIconFormat = CreateGaugesIconFormat(FuelGauge);
export const LinearIconFormat = CreateGaugesIconFormat(LinearGauge);
export const ProgressIconFormat = CreateGaugesIconFormat(ProgressGauge);
export const DashboardIconFormat = CreateGaugesIconFormat(DashboardGauge);
export const SimpleIconFormat = CreateGaugesIconFormat(SimpleGauge);
export const CircularIconFormat = CreateGaugesIconFormat(CircularGauge);
export const MetroIconFormat = CreateGaugesIconFormat(MetroGauge);
export const LiquidIconFormat = CreateGaugesIconFormat(LiquidGauge);
export const DialIconFormat = CreateGaugesIconFormat(DialGauge);
export const SpaceIconFormat = CreateGaugesIconFormat(SpaceGauge);
