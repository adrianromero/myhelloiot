import React, { ComponentType } from "react";
import Icon from "@ant-design/icons";
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { SVGProps } from "react";
import { IconEdit, IconFormat } from "./FormatTypes";

export const toIconText: (text: string) => IconFormat = (text) => ({
  toIcon: (b: Buffer) => text || "\u00A0",
});

export const toIconImage: (
  component:
    | ComponentType<CustomIconComponentProps | SVGProps<SVGSVGElement>>
    | undefined
) => IconFormat = (component) => ({
  toIcon: (b: Buffer) => (
    <Icon component={component} style={{ fontSize: "180%" }} />
  ),
});

export const toIconImageText: (
  component:
    | ComponentType<CustomIconComponentProps | SVGProps<SVGSVGElement>>
    | undefined,
  text: string
) => IconFormat = (component, text) => ({
  toIcon: (b: Buffer) => (
    <>
      <Icon component={component} style={{ fontSize: "120%" }} />
      <div style={{ fontSize: "14px" }}>{text || "\u00A0"}</div>
    </>
  ),
});

export const ToButtonText: (text: string, message: Buffer) => IconEdit = (
  text,
  message
) => ({
  toIcon: (b: Buffer) => text,
  fromString: (s: string) => {
    throw new Error();
  },
  next: (b: Buffer) => message,
  prev: (b: Buffer) => message,
});

export const ToButtonImage: (
  component:
    | ComponentType<CustomIconComponentProps | SVGProps<SVGSVGElement>>
    | undefined,
  message: Buffer
) => IconEdit = (component, message) => ({
  toIcon: (b: Buffer) => (
    <Icon component={component} style={{ fontSize: "180%" }} />
  ),
  fromString: (s: string) => {
    throw new Error();
  },
  next: (b: Buffer) => message,
  prev: (b: Buffer) => message,
});

export const ToButtonImageText: (
  component:
    | ComponentType<CustomIconComponentProps | SVGProps<SVGSVGElement>>
    | undefined,
  text: string,
  message: Buffer
) => IconEdit = (component, text, message) => ({
  toIcon: (b: Buffer) => (
    <>
      <Icon component={component} style={{ fontSize: "120%" }} />
      <div style={{ fontSize: "14px" }}>{text || "\u00A0"}</div>
    </>
  ),
  fromString: (s: string) => {
    throw new Error();
  },
  next: (b: Buffer) => message,
  prev: (b: Buffer) => message,
});
