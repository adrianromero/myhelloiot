import React from "react";
import { IconFormat, NumberValidation } from "./FormatTypes";
import LinearGauge from "../gauge/LinearGauge";
import ProgressGauge from "../gauge/ProgressGauge";
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

function readNumber(buffer: Buffer): number | undefined {
  const s: string = buffer.toString();
  return s ? Number(s) : undefined;
}

export function LinearIconFormat(
  gaugeprops?: GaugeProps,
  valueformat?: Intl.NumberFormatOptions
): IconFormat {
  return {
    toIcon: (buffer) => (
      <LinearGauge
        value={readNumber(buffer)}
        valueformat={valueformat}
        {...gaugeprops}
      />
    ),
  };
}

export function ProgressIconFormat(
  gaugeprops?: GaugeProps,
  valueformat?: Intl.NumberFormatOptions
): IconFormat {
  return {
    toIcon: (buffer) => (
      <ProgressGauge
        value={readNumber(buffer)}
        valueformat={valueformat}
        {...gaugeprops}
      />
    ),
  };
}

export function DashboardIconFormat(
  gaugeprops?: GaugeProps,
  valueformat?: Intl.NumberFormatOptions
): IconFormat {
  return {
    toIcon: (buffer) => (
      <DashboardGauge
        value={readNumber(buffer)}
        valueformat={valueformat}
        {...gaugeprops}
      />
    ),
  };
}

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
