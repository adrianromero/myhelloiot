import React from "react";

import {
  BulbTwoTone,
  BulbFilled,
  ThunderboltFilled,
  ThunderboltTwoTone,
  StarFilled,
  StarTwoTone,
} from "@ant-design/icons";
import { IconFormat, IconValueFormat, ValueFormat } from "./FormatTypes";
import {
  NumberValueFormat,
  StrValueFormat,
  SwitchValueFormat,
} from "./ValueFormat";

export function BulbIconFormat(): IconFormat {
  return {
    toIcon: (b: Buffer) =>
      b.toString() === "1" ? (
        <BulbFilled style={{ fontSize: "180%", color: "yellow" }} />
      ) : (
        <BulbTwoTone style={{ fontSize: "180%" }} twoToneColor="lightgray" />
      ),
  };
}

export function StarIconFormat(): IconFormat {
  return {
    toIcon: (b: Buffer) =>
      b.toString() === "1" ? (
        <StarFilled style={{ fontSize: "180%", color: "yellow" }} />
      ) : (
        <StarTwoTone style={{ fontSize: "180%" }} twoToneColor="lightgray" />
      ),
  };
}

export function ThuderboltIconFormat(): IconFormat {
  return {
    toIcon: (b: Buffer) =>
      b.toString() === "1" ? (
        <ThunderboltFilled style={{ fontSize: "180%", color: "yellow" }} />
      ) : (
        <ThunderboltTwoTone
          style={{ fontSize: "180%" }}
          twoToneColor="lightgray"
        />
      ),
  };
}

export function ToIconFormat(format: ValueFormat): IconFormat {
  return {
    toIcon: (b: Buffer) => (
      <div className={`myh-value myh-value-padding ${format.className()}`}>
        {format.toDisplay(b) || "\u00A0"}
      </div>
    ),
  };
}

export function ToIconValueFormat(
  valueformat: ValueFormat,
  iconformat: IconFormat = ToIconFormat(valueformat)
): IconValueFormat {
  return {
    ...valueformat,
    ...iconformat,
  };
}

export function SwitchIconValueFormat(
  iconformat: IconFormat = StrIconFormat()
): IconValueFormat {
  return ToIconValueFormat(SwitchValueFormat(), iconformat);
}

export function LabelIconFormat(format: ValueFormat): IconFormat {
  return {
    toIcon: (b: Buffer) => format.toDisplay(b) || "\u00A0",
  };
}

export function LabelIconValueFormat(format: ValueFormat): IconValueFormat {
  return ToIconValueFormat(format, LabelIconFormat(format));
}

export function StrIconFormat(): IconFormat {
  return ToIconFormat(StrValueFormat());
}

export function StrIconValueFormat(): IconValueFormat {
  return ToIconValueFormat(StrValueFormat());
}

export function NumberIconFormat(
  options?: Intl.NumberFormatOptions
): IconFormat {
  return ToIconFormat(NumberValueFormat(options));
}
