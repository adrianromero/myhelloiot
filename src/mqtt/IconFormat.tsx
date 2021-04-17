import React from "react";
import { BulbTwoTone, BulbFilled } from "@ant-design/icons";
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
      <BulbTwoTone
        style={{ fontSize: "180%", color: "darkgray" }}
        twoToneColor="lightgray"
      />
    ),
  // <BulbTwoTone
  //   style={{ fontSize: "180%" }}
  //   twoToneColor={b.toString() === "1" ? "yellow" : "lightgray"}
  // />
});

export const ToIconFormatString = () => ToIconFormat(ToString());
export const ToLabelFormatString = () => ToLabelFormat(ToString());
export const ToIconEditString = () => ToIconEdit(ToString());
