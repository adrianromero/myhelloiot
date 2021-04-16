import React from "react";

import {
  IconFormat,
  ToIconFormat,
  ToLabelFormat,
  ToIconEdit,
} from "../mqtt/FormatTypes";
import { ToString } from "./StringEdit";

export const Bulb: () => IconFormat = () => ({
  toIcon: (b: Buffer) => <div>pepe</div>,
});

export const ToIconFormatString = () => ToIconFormat(ToString());
export const ToLabelFormatString = () => ToLabelFormat(ToString());
export const ToIconEditString = () => ToIconEdit(ToString());
