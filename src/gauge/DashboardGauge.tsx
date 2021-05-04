import React from "react";
import { padvalue } from "./svgdraw";
import "./DashboardGauge.css";

export type DashboardGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  min?: number;
  max?: number;
};

const DashboardGauge: React.FC<DashboardGaugeProps> = ({
  value,
  valueformat,
  title = "",
  className = "",
  min = 0,
  max = 100,
}) => {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale);
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  const r = 60;

  let arcvalue: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    arcvalue = 0;
    formatvalue = "";
  } else {
    arcvalue = padvalue(min, max, Math.PI * r)(value);
    formatvalue = intlvalue.format(value);
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 200 130"
      className={className}
    >
      <path
        id="arc"
        d="M40 80 A 60 60 0 0 1 160 80"
        opacity="1"
        className="dashboard-indicator-background"
        style={{
          fill: "#00000000",
          strokeWidth: 40,
          strokeMiterlimit: 0,
          strokeDasharray: "none",
        }}
      />
      <path
        id="arc"
        d="M40 80 A 60 60 0 0 1 160 80"
        opacity="1"
        className="dashboard-indicator-bar"
        style={{
          fill: "#00000000",
          strokeWidth: 40,
          strokeMiterlimit: 0,
          strokeDasharray: `${arcvalue} 200`,
          transition:
            "stroke-dasharray 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s",
        }}
      />
      <text
        x={40}
        y={92}
        textAnchor="middle"
        className="dashboard-indicator-labels"
      >
        {intl.format(min)}
      </text>
      <text
        x={160}
        y={92}
        textAnchor="middle"
        className="dashboard-indicator-labels"
      >
        {intl.format(max)}
      </text>
      <text
        x={100}
        y={85}
        textAnchor="middle"
        className="dashboard-indicator-value"
      >
        {formatvalue}
      </text>
      <text
        x={100}
        y={105}
        textAnchor="middle"
        className="dashboard-indicator-title"
      >
        {title}
      </text>
    </svg>
  );
};

export default DashboardGauge;