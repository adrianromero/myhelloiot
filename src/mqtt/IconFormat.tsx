import React from "react";

import {
  BulbTwoTone,
  BulbFilled,
  ThunderboltFilled,
  ThunderboltTwoTone,
  StarFilled,
  StarTwoTone,
} from "@ant-design/icons";
import {
  IconFormat,
  IconEdit,
  IconFormatNumber,
  NumberValidation,
  ValueEdit,
  ValueFormat,
} from "./FormatTypes";
import { NumberValueEdit, StrValueEdit } from "./ValueFormat";

export const BulbIconFormat: () => IconFormat = () => ({
  toIcon: (b: Buffer) =>
    b.toString() === "1" ? (
      <BulbFilled style={{ fontSize: "180%", color: "yellow" }} />
    ) : (
      <BulbTwoTone style={{ fontSize: "180%" }} twoToneColor="lightgray" />
    ),
});

export const StarIconFormat: () => IconFormat = () => ({
  toIcon: (b: Buffer) =>
    b.toString() === "1" ? (
      <StarFilled style={{ fontSize: "180%", color: "yellow" }} />
    ) : (
      <StarTwoTone style={{ fontSize: "180%" }} twoToneColor="lightgray" />
    ),
});

export const ThuderboltIconFormat: () => IconFormat = () => ({
  toIcon: (b: Buffer) =>
    b.toString() === "1" ? (
      <ThunderboltFilled style={{ fontSize: "180%", color: "yellow" }} />
    ) : (
      <ThunderboltTwoTone
        style={{ fontSize: "180%" }}
        twoToneColor="lightgray"
      />
    ),
});

export const ToIconFormat: (format: ValueFormat) => IconFormat = (format) => ({
  toIcon: (b: Buffer) => (
    <div className={`myh-value myh-value-padding ${format.className()}`}>
      {format.toString(b) || "\u00A0"}
    </div>
  ),
});

export const LabelIconFormat: (format: ValueFormat) => IconFormat = (
  format
) => ({
  toIcon: (b: Buffer) => <>{format.toString(b) || "\u00A0"}</>,
});

export const LabelIconEdit: (format: ValueEdit) => IconEdit = (
  format: ValueEdit
) => ({
  ...format,
  toIcon: (b: Buffer) => <>{format.toString(b) || "\u00A0"}</>,
});

export const ToIconEdit: (format: ValueEdit) => IconEdit = (format) => ({
  ...format,
  toIcon: (b: Buffer) => (
    <div className={`myh-value myh-value-padding ${format.className()}`}>
      {format.toString(b) || "\u00A0"}
    </div>
  ),
});

export const ComposedIconEdit: (
  format: ValueEdit,
  toicon: IconFormat
) => IconEdit = (format, toicon) => ({
  ...format,
  ...toicon,
});

export const StrIconFormat: () => IconFormat = () =>
  ToIconFormat(StrValueEdit());

export const StrIconEdit: () => IconEdit = () => ToIconEdit(StrValueEdit());

export const ToIconFormatNumber: (
  format?: IconFormat,
  validation?: NumberValidation
) => IconFormatNumber = (
  format = ToIconFormat(NumberValueEdit()),
  validation = { min: 0, max: 100, step: 1 }
) => ({
  ...format,
  ...validation,
});
