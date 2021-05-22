import React from "react";
import { arcpath, padvalue } from "./svgdraw";
import "./FuelGauge.css";

export type FuelGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  labelstep?: number;
  min?: number;
  max?: number;
  step?: number;
  startangle?: number;
  endangle?: number;
};

const FuelGauge: React.FC<FuelGaugeProps> = ({
  value,
  valueformat,
  title = "",
  className = "",
  min = 0,
  max = 100,
  step = 2,
  labelstep = 5,
  startangle = 200,
  endangle = 340,
}) => {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale);
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  const r1 = 55;
  const r2 = 50;
  const centerx = 100;
  const centery = 80;

  const arctotal = endangle - startangle;

  let arcvalue: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    arcvalue = 0;
    formatvalue = "";
  } else {
    arcvalue = padvalue(min, max, arctotal)(value);
    formatvalue = intlvalue.format(value);
  }
  arcvalue += startangle - 270;

  const lines = [];
  for (let index = min; index <= max; index += step) {
    const angle = startangle - 360 + (arctotal * (index - min)) / (max - min);
    const cos = Math.cos((angle * Math.PI) / 180);
    const sin = Math.sin((angle * Math.PI) / 180);
    lines.push(
      <line
        key={`ma-${index}`}
        x1={centerx + r1 * cos}
        y1={centery + r1 * sin}
        x2={centerx + (r1 - 5) * cos}
        y2={centery + (r1 - 5) * sin}
        className="fuel-indicator-markstep"
      />
    );
  }
  for (let index = min; index <= max; index += labelstep) {
    const angle = startangle - 360 + (arctotal * (index - min)) / (max - min);
    const cos = Math.cos((angle * Math.PI) / 180);
    const sin = Math.sin((angle * Math.PI) / 180);
    lines.push(
      <line
        key={`mb-${index}`}
        x1={centerx + r1 * cos}
        y1={centery + r1 * sin}
        x2={centerx + (r1 - 8) * cos}
        y2={centery + (r1 - 8) * sin}
        className="fuel-indicator-markstep"
      />
    );
    lines.push(
      <text
        key={`t-${index}`}
        x={centerx + (r1 - 16) * cos}
        y={centery + 2 + (r1 - 16) * sin}
        textAnchor="middle"
        className="fuel-indicator-marklabel"
      >
        {intl.format(index)}
      </text>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 200 130"
      className={className}
    >
      {lines}
      <path
        id="arc"
        d={arcpath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (startangle * Math.PI) / 180,
          end: (endangle * Math.PI) / 180,
          orientation: 0,
          sweep: 1,
        })}
        className="fuel-indicator-mark fuel-indicator-mark_ext"
        style={{ fill: "#00000000" }}
      />
      <path
        id="arc"
        d={arcpath({
          cx: centerx,
          cy: centery,
          r: r2,
          start: (startangle * Math.PI) / 180,
          end: (endangle * Math.PI) / 180,
          orientation: 0,
          sweep: 1,
        })}
        className="fuel-indicator-mark fuel-indicator-mark_int"
        style={{ fill: "#00000000" }}
      />
      <text
        x={100}
        y={105}
        textAnchor="middle"
        className="fuel-indicator-value"
      >
        {formatvalue}
      </text>
      <text
        x={centerx}
        y={15}
        textAnchor="middle"
        className="fuel-indicator-title"
      >
        {title}
      </text>
      <path
        d="M 1.5 0  L -1.5 0 L -1 -42 L 0 -45 L 1 -42  Z"
        className="fuel-indicator-arrow"
        style={{
          transform: `translate(${centerx}px, ${centery}px) rotate(${arcvalue}deg)`,
        }}
      />
      <circle
        cx={centerx}
        cy={centery}
        r={4}
        className="fuel-indicator-arrowpin"
      />
    </svg>
  );
};

export default FuelGauge;
