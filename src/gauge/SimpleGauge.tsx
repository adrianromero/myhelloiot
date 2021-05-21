import React from "react";
import { piepath, padvalue } from "./svgdraw";
import "./SimpleGauge.css";

export type SimpleGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  min?: number;
  max?: number;
};

const SimpleGauge: React.FC<SimpleGaugeProps> = ({
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

  const r1 = 55;
  const sinr2 = Math.sin(Math.PI / 12);
  const cosr2 = Math.cos(Math.PI / 12);
  const r2 = 25;
  const centerx = 100;
  const centery = 65;

  let angle: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    angle = 0;
    formatvalue = "";
  } else {
    angle = padvalue(min, max, 270)(value);
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
        id="pie1"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (181 * Math.PI) / 180,
          end: (135 * Math.PI) / 180,
        })}
        className="simple-indicator-pie"
        style={{
          filter: "brightness(0.50)",
        }}
      />
      <path
        id="pie2"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (226 * Math.PI) / 180,
          end: (180 * Math.PI) / 180,
        })}
        className="simple-indicator-pie"
        style={{
          filter: "brightness(0.60)",
        }}
      />
      <path
        id="pie3"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (271 * Math.PI) / 180,
          end: (225 * Math.PI) / 180,
        })}
        className="simple-indicator-pie"
        style={{
          filter: "brightness(0.70)",
        }}
      />
      <path
        id="pie4"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (316 * Math.PI) / 180,
          end: (270 * Math.PI) / 180,
        })}
        className="simple-indicator-pie"
        style={{
          filter: "brightness(0.80)",
        }}
      />
      <path
        id="pie5"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (361 * Math.PI) / 180,
          end: (315 * Math.PI) / 180,
        })}
        className="simple-indicator-pie"
        style={{
          filter: "brightness(0.90)",
        }}
      />
      <path
        id="pie6"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (46 * Math.PI) / 180,
          end: (0 * Math.PI) / 180,
        })}
        className="simple-indicator-pie"
        style={{
          filter: "brightness(1)",
        }}
      />

      <path
        id="arc"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (45 * Math.PI) / 180,
          end: (135 * Math.PI) / 180,
          orientation: 1,
        })}
        className="simple-indicator-mark"
        style={{ fill: "#00000000" }}
      />

      <text
        x={50}
        y={115}
        textAnchor="middle"
        className="simple-indicator-labels"
      >
        {intl.format(min)}
      </text>
      <text
        x={150}
        y={115}
        textAnchor="middle"
        className="simple-indicator-labels"
      >
        {intl.format(max)}
      </text>

      <path
        id="arcindicator"
        d={`M${centerx - sinr2 * r2} ${
          centery - cosr2 * r2
        } A ${r2} ${r2} 0 1 0 ${centerx + sinr2 * r2} ${
          centery - cosr2 * r2
        } L ${centerx} ${centery - 45} Z`}
        opacity="1"
        className="simple-indicator-arrow"
        style={{
          transform: `translate(${centerx}px, ${centery}px) rotate(${
            angle - 135
          }deg) translate(${-centerx}px, ${-centery}px)`,
        }}
      />
      <text
        x={centerx}
        y={centery + 5}
        textAnchor="middle"
        className="simple-indicator-value"
      >
        {formatvalue}
      </text>
      <text
        x={100}
        y={110}
        textAnchor="middle"
        className="simple-indicator-title"
      >
        {title}
      </text>
    </svg>
  );
};

export default SimpleGauge;
