import React from "react";

export type LinearGaugeProps = { value: number; min?: number; max?: number };

const LinearGauge: React.FC<LinearGaugeProps> = ({
  value,
  min = 0,
  max = 100,
}) => {
  let width = (160 * value) / (max - min);
  if (width < 0) {
    width = 0;
  }
  if (width > 160) {
    width = 160;
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 100">
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
        className="indicator"
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
      <text
        x={20}
        y={60}
        fill="#606060"
        textAnchor="middle"
        style={{ font: "bold 14px sans-serif" }}
      >
        {min}
      </text>
      <text
        x={180}
        y={60}
        fill="#606060"
        textAnchor="middle"
        style={{ font: "bold 14px sans-serif" }}
      >
        {max}
      </text>
    </svg>
  );
};

export default LinearGauge;
