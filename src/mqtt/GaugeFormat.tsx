import { IconFormat, NumberValidation } from "./FormatTypes";
import LinearGauge from "../gauge/LinearGauge";

export const LinearIconFormat: (validation: NumberValidation) => IconFormat = (
  validation
) => ({
  toIcon: (buffer) => (
    <LinearGauge
      min={validation.min}
      max={validation.max}
      value={Number(buffer.toString())}
    />
  ),
});
