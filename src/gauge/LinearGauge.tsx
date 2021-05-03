import React from "react";
import { padvalue } from "./svgdraw";
import "./LinearGauge.css";

export type LinearGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
};

const LinearGauge: React.FC<LinearGaugeProps> = ({
  value,
  valueformat,
  title = "",
  className = "",
  min = 0,
  max = 100,
  step = 5,
}) => {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale);
  const intlvalue = new Intl.NumberFormat(locale, valueformat);

  let width: number;
  let formatvalue: string;
  if (typeof value === "undefined" || isNaN(value)) {
    width = 0;
    formatvalue = "";
  } else {
    width = padvalue(min, max, 160)(value);
    formatvalue = intlvalue.format(value);
  }

  const incstep = (160 * step) / (max - min);
  const lines = [];
  for (let index = 20; index < 180; index += incstep) {
    lines.push(
      <line
        x1={index}
        y1={62}
        x2={index}
        y2={66}
        className="linear-indicator-mark"
      />
    );
  }
  lines.push(
    <line x1={180} y1={62} x2={180} y2={66} className="linear-indicator-mark" />
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 200 130"
      className={className}
    >
      <line
        x1={20}
        y1={29}
        x2={180}
        y2={29}
        className="linear-indicator-mark"
      />
      <rect
        x={20}
        y={32}
        width={160}
        height={25}
        className="linear-indicator-background"
      />
      <rect
        x={20}
        y={32}
        width={width}
        height={25}
        className="linear-indicator-bar"
        style={{
          transition: "width 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s",
        }}
      />

      <line
        x1={20}
        y1={60}
        x2={180}
        y2={60}
        className="linear-indicator-mark"
      />
      {lines}
      <text
        x={20}
        y={80}
        textAnchor="middle"
        className="linear-indicator-labels"
      >
        {intl.format(min)}
      </text>
      <text
        x={180}
        y={80}
        textAnchor="middle"
        className="linear-indicator-labels"
      >
        {intl.format(max)}
      </text>
      <text x={180} y={20} textAnchor="end" className="linear-indicator-value">
        {formatvalue}
      </text>
      <text x={20} y={20} textAnchor="start" className="linear-indicator-title">
        {title}
      </text>
    </svg>
  );
};

export default LinearGauge;
