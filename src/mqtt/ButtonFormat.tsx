import { IconEdit } from "./FormatTypes";

export const ToButtonMessage: (label: string, message: Buffer) => IconEdit = (
  label,
  message
) => ({
  toIcon: (b: Buffer) => label,
  fromString: (s: string) => {
    throw new Error();
  },
  next: (b: Buffer) => message,
  prev: (b: Buffer) => message,
});
