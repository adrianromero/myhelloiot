/*
MYHELLOIOT
Copyright (C) 2021 Adrián Romero
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React, { ComponentType } from "react";
import Icon from "@ant-design/icons";
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { SVGProps } from "react";
import { IconFormat, ValueFormat, IconValueFormat } from "./FormatTypes";

export const LabelIconFormat = (text: string): IconFormat => ({
  toIcon: (b: Buffer): React.ReactNode => text ?? "\u00A0",
});

export const LabelIconValueFormat = (
  text: string,
  valueformat: ValueFormat
): IconValueFormat => ({
  ...valueformat,
  ...LabelIconFormat(text),
});

export const ImageIconFormat = (
  component:
    | ComponentType<CustomIconComponentProps | SVGProps<SVGSVGElement>>
    | undefined
): IconFormat => ({
  toIcon: (b: Buffer): React.ReactNode => (
    <Icon component={component} style={{ fontSize: "180%" }} />
  ),
});

export const TitleIconFormat = (
  component:
    | ComponentType<CustomIconComponentProps | SVGProps<SVGSVGElement>>
    | undefined,
  text: string
): IconFormat => ({
  toIcon: (b: Buffer): React.ReactNode => (
    <>
      <Icon component={component} style={{ fontSize: "120%" }} />
      <div style={{ fontSize: "14px" }}>{text || "\u00A0"}</div>
    </>
  ),
});

export const MessageValueFormat = (message: Buffer): ValueFormat => ({
  toDisplay: (b: Buffer) => {
    throw new Error();
  },
  fromDisplay: (s: string) => {
    throw new Error();
  },
  className: () => {
    throw new Error();
  },
  next: (b: Buffer) => message,
  prev: (b: Buffer) => message,
});

export const LiteralIconValueFormat = (
  text: string,
  message: Buffer
): IconValueFormat => ({
  ...LabelIconFormat(text),
  ...MessageValueFormat(message),
});

export const ImageIconValueFormat = (
  component:
    | ComponentType<CustomIconComponentProps | SVGProps<SVGSVGElement>>
    | undefined,
  message: Buffer
): IconValueFormat => ({
  ...ImageIconFormat(component),
  ...MessageValueFormat(message),
});

export const TitleIconValueFormat = (
  component:
    | ComponentType<CustomIconComponentProps | SVGProps<SVGSVGElement>>
    | undefined,
  text: string,
  message: Buffer
): IconValueFormat => ({
  ...TitleIconFormat(component, text),
  ...MessageValueFormat(message),
});
