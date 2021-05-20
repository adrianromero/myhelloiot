import React from "react";
import { padvalue } from "./svgdraw";
import "./ProgressGauge.css";

export type ProgressGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  min?: number;
  max?: number;
};

const ProgressGauge: React.FC<ProgressGaugeProps> = ({
  value,
  valueformat,
  title = "",
  className = "",
  min = 0,
  max = 100,
}) => {
  const locale = navigator.language;
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  let width: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    width = 0;
    formatvalue = "";
  } else {
    width = padvalue(min, max, 160)(value);
    formatvalue = intlvalue.format(value);
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 200 30"
      className={className}
    >
      <rect
        x={20}
        y={16}
        width={160}
        height={8}
        rx={4}
        className="progress-indicator-background"
      />
      <rect
        x={20}
        y={16}
        width={width}
        height={8}
        rx={4}
        className="progress-indicator-bar"
      />

      <text
        x={180}
        y={12}
        textAnchor="end"
        className="progress-indicator-value"
      >
        {formatvalue}
      </text>
      <text
        x={20}
        y={10}
        textAnchor="start"
        className="progress-indicator-title"
      >
        {title}
      </text>
    </svg>
  );
};

export default ProgressGauge;
