import React from "react";
import { StringFormat } from "../mqtt/FormatTypes";
import { ToString } from "./StringFormat";

export type IconFormat = {
  toIcon: (b: Buffer) => React.ReactNode;
};

type NodeFormat = StringFormat & IconFormat;

export const Bulb: () => IconFormat = () => ({
  toIcon: (b: Buffer) => <div>pepe</div>,
});

export const ToIcon: (format: StringFormat) => NodeFormat = (
  format: StringFormat
) => ({
  toString: (b: Buffer) => format.toString(b),
  fromString: (s: string) => format.fromString(s),
  next: (b: Buffer) => format.next(b),
  prev: (b: Buffer) => format.prev(b),
  className: () => format.className(),
  toIcon: (b: Buffer) => (
    <div className={`myh-value myh-value-padding ${format.className()}`}>
      {format.toString(b) || "\u00A0"}
    </div>
  ),
});

export const ToIconString = () => ToIcon(ToString());
