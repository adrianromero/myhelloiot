import React from "react";
import { arcpath, padvalue } from "./svgdraw";
import "./MetroGauge.css";

export type MetroGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  labelstep?: number;
};

const MetroGauge: React.FC<MetroGaugeProps> = ({
  value,
  valueformat,
  title = "",
  className = "",
  min = 0,
  max = 100,
  step = 2,
  labelstep = 5,
}) => {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale);
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  const r1 = 55;
  const centerx = 100;
  const centery = 60;
  const arctotal = 270;

  let arcvalue: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    arcvalue = 0;
    formatvalue = "";
  } else {
    arcvalue = padvalue(min, max, arctotal)(value);
    formatvalue = intlvalue.format(value);
  }
  arcvalue -= 135;

  const lines = [];
  for (let index = min; index <= max; index += step) {
    const angle = 135 + (arctotal * (index - min)) / (max - min);
    const cos = Math.cos((angle * Math.PI) / 180);
    const sin = Math.sin((angle * Math.PI) / 180);
    lines.push(
      <line
        x1={centerx + r1 * cos}
        y1={centery + r1 * sin}
        x2={centerx + (r1 - 3) * cos}
        y2={centery + (r1 - 3) * sin}
        className="metro-indicator-mark"
      />
    );
  }
  for (let index = min; index <= max; index += labelstep) {
    const angle = 135 + (arctotal * (index - min)) / (max - min);
    const cos = Math.cos((angle * Math.PI) / 180);
    const sin = Math.sin((angle * Math.PI) / 180);
    lines.push(
      <>
        <line
          x1={centerx + r1 * cos}
          y1={centery + r1 * sin}
          x2={centerx + (r1 - 6) * cos}
          y2={centery + (r1 - 6) * sin}
          className="metro-indicator-markstep"
        />
        <text
          x={centerx + (r1 - 13) * cos}
          y={centery + 2 + (r1 - 13) * sin}
          textAnchor="middle"
          className="metro-indicator-marklabel"
        >
          {intl.format(index)}
        </text>
      </>
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
          r: r1 + 2,
          start: (45 * Math.PI) / 180,
          end: (135 * Math.PI) / 180,
          orientation: 1,
        })}
        className="metro-indicator-mark"
        style={{ fill: "#00000000" }}
      />
      <text
        x={100}
        y={80}
        textAnchor="middle"
        className="metro-indicator-value"
      >
        {formatvalue}
      </text>
      <text
        x={centerx}
        y={50}
        textAnchor="middle"
        className="metro-indicator-title"
      >
        {title}
      </text>
      <path
        d="M 3 10 L -3 10 L 0 -50 Z"
        className="metro-indicator-arrow"
        style={{
          transform: `translate(${centerx}px, ${centery}px) rotate(${arcvalue}deg)`,
        }}
      />
      <circle
        cx={centerx}
        cy={centery}
        r={1.2}
        className="metro-indicator-arrowpin"
      />
    </svg>
  );
};

export default MetroGauge;
