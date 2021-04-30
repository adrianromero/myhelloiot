import { IconFormat, NumberValidation } from "./FormatTypes";
import LinearGauge from "../gauge/LinearGauge";
import DashboardGauge from "../gauge/DashboardGauge";

export const LinearIconFormat: (validation: NumberValidation) => IconFormat = (
  validation
) => ({
  toIcon: (buffer) => (
    <LinearGauge
      min={validation.min}
      max={validation.max}
      step={validation.step}
      value={Number(buffer.toString())}
    />
  ),
});

export const DashboardIconFormat: (
  validation: NumberValidation,
  valueformat?: Intl.NumberFormatOptions
) => IconFormat = (validation, valueformat) => ({
  toIcon: (buffer) => (
    <DashboardGauge
      value={Number(buffer.toString())}
      valueformat={valueformat}
      min={validation.min}
      max={validation.max}
    />
  ),
});
