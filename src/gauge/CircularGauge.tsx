import React from "react";
import { padvalue } from "./svgdraw";
import "./CircularGauge.css";

export type CircularGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
};

const CircularGauge: React.FC<CircularGaugeProps> = ({
  value,
  valueformat,
  title = "",
  className = "",
  min = 0,
  max = 100,
}) => {
  const locale = navigator.language;
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  const r1 = 55;
  const centerx = 100;
  const centery = 60;

  let arcvalue: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    arcvalue = 0;
    formatvalue = "";
  } else {
    arcvalue = padvalue(min, max, Math.PI * r1 * 2)(value);
    formatvalue = intlvalue.format(value);
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 200 130"
      className={className}
    >
      <circle
        cx={centerx}
        cy={centery}
        r={r1}
        className="circular-indicator-background"
        style={{
          fill: "#00000000",
          strokeMiterlimit: 0,
        }}
      />
      <circle
        cx={centerx}
        cy={centery}
        r={r1}
        className="circular-indicator-bar"
        style={{
          fill: "#00000000",
          strokeMiterlimit: 0,
          strokeDasharray: `${arcvalue} 400`,
          transform: `translate(100px, 60px) rotate(-90deg) translate(-100px, -60px)`,
        }}
      />
      <text
        x={100}
        y={60}
        textAnchor="middle"
        className="circular-indicator-value"
      >
        {formatvalue}
      </text>
      <text
        x={100}
        y={80}
        textAnchor="middle"
        className="circular-indicator-title"
      >
        {title}
      </text>
    </svg>
  );
};

export default CircularGauge;
