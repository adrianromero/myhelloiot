import React from "react";

export type IconFormat = {
  toIcon: (b: Buffer) => React.ReactNode;
};

export type ValueFormat = {
  toString: (b: Buffer) => string;
  className: () => string;
};

export type ValueParse = {
  fromString: (s: string) => Buffer;
  next: (b: Buffer) => Buffer;
  prev: (b: Buffer) => Buffer;
};

export type NumberValidation = {
  min: number;
  max: number;
  step: number;
};

export type ValueFormatNumber = ValueFormat & NumberValidation;
export type IconFormatNumber = IconFormat & NumberValidation;

export type ValueEdit = ValueFormat & ValueParse;
export type IconEdit = IconFormat & ValueParse;

export type ValueEditNumber = ValueEdit & NumberValidation;
export type IconEditNumber = IconEdit & NumberValidation;
