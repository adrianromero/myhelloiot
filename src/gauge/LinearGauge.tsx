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
  labelstep?: number;
};

const LinearGauge: React.FC<LinearGaugeProps> = ({
  value,
  valueformat,
  title = "",
  className = "",
  min = 0,
  max = 100,
  step = 5,
  labelstep = 10,
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

  const lines = [];
  for (let index = min; index <= max; index += step) {
    const mark = 20 + (160 * (index - min)) / (max - min);
    lines.push(
      <line
        x1={mark}
        y1={60}
        x2={mark}
        y2={63}
        className="linear-indicator-mark"
      />
    );
  }

  for (let index = min; index <= max; index += labelstep) {
    const mark = 20 + (160 * (index - min)) / (max - min);
    lines.push(
      <>
        <line
          x1={mark}
          y1={60}
          x2={mark}
          y2={65}
          className="linear-indicator-markstep"
        />
        <text
          x={mark}
          y={75}
          textAnchor="middle"
          className="linear-indicator-marklabel"
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
      viewBox="0 0 200 90"
      className={className}
    >
      <line
        x1={20}
        y1={29}
        x2={180}
        y2={29}
        className="linear-indicator-markstep"
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
        className="linear-indicator-markstep"
      />
      {lines}
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
