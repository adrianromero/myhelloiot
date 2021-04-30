import React from "react";

export type LinearGaugeProps = {
  value: number;
  valueformat?: Intl.NumberFormatOptions;
  min?: number;
  max?: number;
  step?: number;
};

const DashboardGauge: React.FC<LinearGaugeProps> = ({
  value,
  valueformat,
  min = 0,
  max = 100,
}) => {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale);
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  const arcvalue = (Math.PI * 60 * value) / (max - min);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 133">
      <path
        id="arc"
        d="M40 80 A 60 60 0 0 1 160 80"
        opacity="1"
        className="base"
        style={{
          fill: "#00000000",
          strokeWidth: 40,
          strokeMiterlimit: 0,
          strokeDasharray: "none",
          stroke: "#cccccc",
          strokeOpacity: 1,
        }}
      />
      <path
        id="arc"
        d="M40 80 A 60 60 0 0 1 160 80"
        opacity="1"
        className="base"
        style={{
          fill: "#00000000",
          strokeWidth: 40,
          strokeMiterlimit: 0,
          strokeDasharray: `${arcvalue} 200`,
          stroke: "#ff0000",
          strokeOpacity: 1,
          transition:
            "stroke-dasharray 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s",
        }}
      />
      <text
        x={40}
        y={95}
        fill="#606060"
        textAnchor="middle"
        style={{ font: "14px sans-serif" }}
      >
        {intl.format(min)}
      </text>
      <text
        x={160}
        y={95}
        fill="#606060"
        textAnchor="middle"
        style={{ font: "14px sans-serif" }}
      >
        {intl.format(max)}
      </text>
      <text
        x={100}
        y={85}
        fill="#000000d9"
        textAnchor="middle"
        style={{ font: "bold 18px sans-serif" }}
      >
        {intlvalue.format(value)}
      </text>
    </svg>
  );
};

export default DashboardGauge;
