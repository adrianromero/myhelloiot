import React from "react";

import { IconFormat, ToIconFormat } from "../mqtt/FormatTypes";
import { ToString } from "./StringEdit";

export const Bulb: () => IconFormat = () => ({
  toIcon: (b: Buffer) => <div>pepe</div>,
});

export const ToIconString = () => ToIconFormat(ToString());
