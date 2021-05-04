import React from "react";
import { IconFormat, NumberValidation } from "./FormatTypes";
import LinearGauge from "../gauge/LinearGauge";
import DashboardGauge from "../gauge/DashboardGauge";
import SimpleGauge from "../gauge/SimpleGauge";
import CircularGauge from "../gauge/CircularGauge";
import MetroGauge from "../gauge/MetroGauge";

export type GaugeProps =
  | {
      title?: string;
      className?: string;
      labelstep?: number;
    }
  | NumberValidation;

const readNumber: (buffer: Buffer) => number | undefined = (buffer) => {
  const s: string = buffer.toString();
  return s ? Number(s) : undefined;
};

export const LinearIconFormat: (
  gaugeprops?: GaugeProps,
  valueformat?: Intl.NumberFormatOptions
) => IconFormat = (gaugeprops, valueformat) => ({
  toIcon: (buffer) => (
    <LinearGauge
      value={readNumber(buffer)}
      valueformat={valueformat}
      {...gaugeprops}
    />
  ),
});

export const DashboardIconFormat: (
  gaugeprops?: GaugeProps,
  valueformat?: Intl.NumberFormatOptions
) => IconFormat = (gaugeprops, valueformat) => ({
  toIcon: (buffer) => (
    <DashboardGauge
      value={readNumber(buffer)}
      valueformat={valueformat}
      {...gaugeprops}
    />
  ),
});

export const SimpleIconFormat: (
  gaugeprops?: GaugeProps,
  valueformat?: Intl.NumberFormatOptions
) => IconFormat = (gaugeprops, valueformat) => ({
  toIcon: (buffer) => (
    <SimpleGauge
      value={readNumber(buffer)}
      valueformat={valueformat}
      {...gaugeprops}
    />
  ),
});

export const CircularIconFormat: (
  gaugeprops?: GaugeProps,
  valueformat?: Intl.NumberFormatOptions
) => IconFormat = (gaugeprops, valueformat) => ({
  toIcon: (buffer) => (
    <CircularGauge
      value={readNumber(buffer)}
      valueformat={valueformat}
      {...gaugeprops}
    />
  ),
});

export const MetroIconFormat: (
  gaugeprops?: GaugeProps,
  valueformat?: Intl.NumberFormatOptions
) => IconFormat = (gaugeprops, valueformat) => ({
  toIcon: (buffer) => (
    <MetroGauge
      value={readNumber(buffer)}
      valueformat={valueformat}
      {...gaugeprops}
    />
  ),
});
