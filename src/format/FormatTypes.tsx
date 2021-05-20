import React from "react";

export type IconFormat = {
  toIcon: (b: Buffer) => React.ReactNode;
};

export type ValueFormat = {
  toDisplay: (b: Buffer) => string;
  fromDisplay: (s: string) => Buffer;
  className: () => string;
  next: (b: Buffer) => Buffer;
  prev: (b: Buffer) => Buffer;
};

export type NumberValidation = {
  min?: number;
  max?: number;
  step?: number;
};

export type ValueFormatNumber = ValueFormat & NumberValidation;
export type IconFormatNumber = IconFormat & NumberValidation;

export type IconValueFormat = IconFormat & ValueFormat;
export type IconValueFormatNumber = IconFormat & ValueFormat & NumberValidation;
