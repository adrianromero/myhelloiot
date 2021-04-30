import React from "react";

export type LinearGaugeProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
};

const LinearGauge: React.FC<LinearGaugeProps> = ({
  value,
  min = 0,
  max = 100,
  step = 5,
}) => {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale);

  const incstep = (160 * step) / (max - min);
  const lines = [];
  for (let index = 20; index < 180; index += incstep) {
    lines.push(
      <line
        x1={index}
        y1={42}
        x2={index}
        y2={46}
        style={{ stroke: "#606060", strokeWidth: 1 }}
      />
    );
  }
  lines.push(
    <line
      x1={180}
      y1={42}
      x2={180}
      y2={46}
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
        y1={9}
        x2={180}
        y2={9}
        style={{ stroke: "#606060", strokeWidth: 1 }}
      />
      <rect
        x={20}
        y={12}
        width={160}
        height={25}
        fill="#cccccc"
        className="base"
      />
      <rect
        x={20}
        y="12"
        width={width}
        height={25}
        fill="#ff0000"
        className="indicator"
        style={{
          transition: "width 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s",
        }}
      />

      <line
        x1={20}
        y1={40}
        x2={180}
        y2={40}
        style={{ stroke: "#606060", strokeWidth: 1 }}
      />
      {lines}
      <text
        x={20}
        y={60}
        fill="#606060"
        textAnchor="middle"
        style={{ font: "bold 14px sans-serif" }}
      >
        {intl.format(min)}
      </text>
      <text
        x={180}
        y={60}
        fill="#606060"
        textAnchor="middle"
        style={{ font: "bold 14px sans-serif" }}
      >
        {intl.format(max)}
      </text>
    </svg>
  );
};

export default LinearGauge;
