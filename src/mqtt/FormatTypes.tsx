import React from "react";

export type IconFormat = {
  toIcon: (b: Buffer) => React.ReactNode;
};
export type StringFormat = {
  toString: (b: Buffer) => string;
  className: () => string;
};

export type StringParse = {
  fromString: (s: string) => Buffer;
  next: (b: Buffer) => Buffer;
  prev: (b: Buffer) => Buffer;
};

export type StringEdit = StringFormat & StringParse;

export type IconEdit = IconFormat & StringParse;

export const ToIconFormat: (format: StringFormat) => IconFormat = (
  format: StringFormat
) => ({
  toIcon: (b: Buffer) => (
    <div className={`myh-value myh-value-padding ${format.className()}`}>
      {format.toString(b) || "\u00A0"}
    </div>
  ),
});
