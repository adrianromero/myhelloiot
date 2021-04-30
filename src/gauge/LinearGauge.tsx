import React from "react";
import "./LinearGauge.css";

export type LinearGaugeProps = {
  value: number;
  valueformat?: Intl.NumberFormatOptions;
  min?: number;
  max?: number;
  step?: number;
};

const LinearGauge: React.FC<LinearGaugeProps> = ({
  value,
  valueformat,
  min = 0,
  max = 100,
  step = 5,
}) => {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale);
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  const incstep = (160 * step) / (max - min);
  const lines = [];
  for (let index = 20; index < 180; index += incstep) {
    lines.push(
      <line
        x1={index}
        y1={62}
        x2={index}
        y2={66}
        style={{ stroke: "#606060", strokeWidth: 1 }}
      />
    );
  }
  lines.push(
    <line
      x1={180}
      y1={62}
      x2={180}
      y2={66}
      style={{ stroke: "#606060", strokeWidth: 1 }}
    />
  );
  let width = (160 * value) / (max - min);
  if (width < 0) {
    width = 0;
  }
  if (width > 160) {
    width = 160;
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 133">
      <line
        x1={20}
        y1={29}
        x2={180}
        y2={29}
        style={{ stroke: "#606060", strokeWidth: 1 }}
      />
      <rect
        x={20}
        y={32}
        width={160}
        height={25}
        fill="#cccccc"
        className="base"
      />
      <rect
        x={20}
        y={32}
        width={width}
        height={25}
        className="linear-indicatorbar"
        style={{
          transition: "width 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s",
        }}
      />

      <line
        x1={20}
        y1={60}
        x2={180}
        y2={60}
        style={{ stroke: "#606060", strokeWidth: 1 }}
      />
      {lines}
      <text
        x={20}
        y={80}
        fill="#606060"
        textAnchor="middle"
        style={{ font: "14px sans-serif" }}
      >
        {intl.format(min)}
      </text>
      <text
        x={180}
        y={80}
        fill="#606060"
        textAnchor="middle"
        style={{ font: "14px sans-serif" }}
      >
        {intl.format(max)}
      </text>
      <text
        x={180}
        y={20}
        fill="#000000d9"
        textAnchor="end"
        style={{ font: "bold 14px sans-serif" }}
      >
        {intlvalue.format(value)}
      </text>
    </svg>
  );
};

export default LinearGauge;
