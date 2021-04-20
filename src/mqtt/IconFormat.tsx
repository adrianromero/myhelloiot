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
  ToIconFormat,
  ToLabelFormat,
  ToIconEdit,
} from "../mqtt/FormatTypes";
import { ToString } from "./StringEdit";

export const ToIconBulb: () => IconFormat = () => ({
  toIcon: (b: Buffer) =>
    b.toString() === "1" ? (
      <BulbFilled style={{ fontSize: "180%", color: "yellow" }} />
    ) : (
      <BulbTwoTone style={{ fontSize: "180%" }} twoToneColor="lightgray" />
    ),
});

export const ToStar: () => IconFormat = () => ({
  toIcon: (b: Buffer) =>
    b.toString() === "1" ? (
      <StarFilled style={{ fontSize: "180%", color: "yellow" }} />
    ) : (
      <StarTwoTone style={{ fontSize: "180%" }} twoToneColor="lightgray" />
    ),
});

export const ToThuderbolt: () => IconFormat = () => ({
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

export const ToIconFormatString = () => ToIconFormat(ToString());
export const ToLabelFormatString = () => ToLabelFormat(ToString());
export const ToIconEditString = () => ToIconEdit(ToString());
