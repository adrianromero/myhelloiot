import React from "react";
import { padvalue } from "./svgdraw";
import "./DialGauge.css";

export type DialGaugeProps = {
  value?: number;
  valueformat?: Intl.NumberFormatOptions;
  title?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  labelstep?: number;
};

const DialGauge: React.FC<DialGaugeProps> = ({
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
        y1={36}
        x2={mark}
        y2={54}
        className="dial-indicator-mark"
      />
    );
  }

  for (let index = min; index <= max; index += labelstep) {
    const mark = 20 + (160 * (index - min)) / (max - min);
    lines.push(
      <>
        <line
          x1={mark}
          y1={30}
          x2={mark}
          y2={60}
          className="dial-indicator-markstep"
        />
        <text
          x={mark}
          y={70}
          textAnchor="middle"
          className="dial-indicator-marklabel"
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
      <rect
        x={20}
        y={42}
        width={160}
        height={6}
        className="dial-indicator-background"
      />
      {lines}
      <rect
        x={20}
        y={42}
        width={width}
        height={6}
        className="dial-indicator-bar"
      />
      <text x={180} y={20} textAnchor="end" className="dial-indicator-value">
        {formatvalue}
      </text>
      <text x={20} y={20} textAnchor="start" className="dial-indicator-title">
        {title}
      </text>
    </svg>
  );
};

export default DialGauge;
