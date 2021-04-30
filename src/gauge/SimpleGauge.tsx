import React from "react";

export type SimpleGaugeProps = {
  value: number;
  valueformat?: Intl.NumberFormatOptions;
  min?: number;
  max?: number;
  step?: number;
};

const piepath: (args: {
  cx: number;
  cy: number;
  r: number;
  start: number;
  end: number;
  orientation?: number;
}) => string = ({ cx, cy, r, start, end, orientation = 0 }) => {
  return `M${cx + Math.cos(start) * r} ${
    cy + Math.sin(start) * r
  } A ${r} ${r} 1 ${orientation} 0 ${cx + Math.cos(end) * r} ${
    cy + Math.sin(end) * r
  } L ${cx} ${cy} Z`;
};

const SimpleGauge: React.FC<SimpleGaugeProps> = ({
  value,
  valueformat,
  min = 0,
  max = 100,
}) => {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale);
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  const sin45 = Math.sin(Math.PI / 4);
  const cos45 = Math.cos(Math.PI / 4);
  const r1 = 55;
  const sinr2 = Math.sin(Math.PI / 10);
  const cosr2 = Math.cos(Math.PI / 10);
  const r2 = 25;
  const centerx = 100;
  const centery = 60;

  let angle = (270 * value) / (max - min);
  if (angle < 0) {
    angle = 0;
  }
  if (angle > 270) {
    angle = 270;
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 133">
      <path
        id="arc"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (181 * Math.PI) / 180,
          end: (135 * Math.PI) / 180,
        })}
        className="pie1"
        style={{
          fill: "#ff0000",
          filter: "brightness(0.50)",
        }}
      />
      <path
        id="arc"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (226 * Math.PI) / 180,
          end: (180 * Math.PI) / 180,
        })}
        className="pie2"
        style={{
          fill: "#ff0000",
          filter: "brightness(0.60)",
        }}
      />
      <path
        id="arc"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (271 * Math.PI) / 180,
          end: (225 * Math.PI) / 180,
        })}
        className="pie3"
        style={{
          fill: "#ff0000",
          filter: "brightness(0.70)",
        }}
      />
      <path
        id="arc"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (316 * Math.PI) / 180,
          end: (270 * Math.PI) / 180,
        })}
        className="pie4"
        style={{
          fill: "#ff0000",
          filter: "brightness(0.80)",
        }}
      />
      <path
        id="arc"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (361 * Math.PI) / 180,
          end: (315 * Math.PI) / 180,
        })}
        className="pie5"
        style={{
          fill: "#ff0000",
          filter: "brightness(0.90)",
        }}
      />
      <path
        id="arc"
        d={piepath({
          cx: centerx,
          cy: centery,
          r: r1,
          start: (46 * Math.PI) / 180,
          end: (0 * Math.PI) / 180,
        })}
        className="pie6"
        style={{
          fill: "#ff0000",
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
        opacity="1"
        className="base"
        style={{
          fill: "#00000000",
          strokeWidth: 2,
          strokeMiterlimit: 0,

          strokeDasharray: "none",
          stroke: "#6c6c6c",
          strokeOpacity: 1,
        }}
      />

      <text
        x={50}
        y={110}
        fill="#606060"
        textAnchor="middle"
        style={{ font: "14px sans-serif" }}
      >
        {intl.format(min)}
      </text>
      <text
        x={150}
        y={110}
        fill="#606060"
        textAnchor="middle"
        style={{ font: "14px sans-serif" }}
      >
        {intl.format(max)}
      </text>

      <path
        id="arc"
        d={`M${centerx - sinr2 * r2} ${
          centery - cosr2 * r2
        } A ${r2} ${r2} 0 1 0 ${centerx + sinr2 * r2} ${
          centery - cosr2 * r2
        } L ${centerx} ${centery - 50} Z`}
        opacity="1"
        className="base"
        style={{
          fill: "#ffffff",
          strokeWidth: 2,
          strokeMiterlimit: 0,
          strokeDasharray: "none",
          stroke: "#6c6c6c",

          strokeOpacity: 1,
          transform: ` translate(100px, 60px) rotate(${
            angle - 135
          }deg) translate(-100px, -60px)`,
          transition: "transform 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s",
        }}
      />
      <text
        x={centerx}
        y={centery + 5}
        fill="#000000d9"
        textAnchor="middle"
        style={{ font: "bold 14px sans-serif" }}
      >
        {intlvalue.format(value)}
      </text>
    </svg>
  );
};

export default SimpleGauge;
