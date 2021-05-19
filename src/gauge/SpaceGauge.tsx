import React from "react";
import { padvalue, arcpath } from "./svgdraw";
import "./SpaceGauge.css";

export type SpaceGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
};

const SpaceGauge: React.FC<SpaceGaugeProps> = ({
  value,
  valueformat,
  title = "",
  className = "",
  min = 0,
  max = 100,
}) => {
  const locale = navigator.language;
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  const r1 = 50;
  const centerx = 100;
  const centery = 60;

  let arcvalue: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    arcvalue = 0;
    formatvalue = "";
  } else {
    arcvalue = padvalue(min, max, (Math.PI * r1 * 2 * 3) / 4)(value);
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
        id="path1"
        d={arcpath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (90 * Math.PI) / 180,
          end: (0 * Math.PI) / 180,
          orientation: 1,
          sweep: 1,
        })}
        className="space-indicator-background"
      />
      <path
        id="path2"
        d={arcpath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (90 * Math.PI) / 180,
          end: (0 * Math.PI) / 180,
          orientation: 1,
          sweep: 1,
        })}
        className="space-indicator-bar"
        style={{
          strokeDasharray: `${arcvalue} 400`,
          transition:
            "stroke-dasharray 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s",
        }}
      />

      <text
        x={105}
        y={100}
        textAnchor="start"
        className="space-indicator-value"
      >
        {formatvalue}
      </text>
      <text x={105} y={75} textAnchor="start" className="space-indicator-title">
        {title}
      </text>
    </svg>
  );
};

export default SpaceGauge;
