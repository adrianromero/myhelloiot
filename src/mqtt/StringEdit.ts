import { StringEdit } from "./FormatTypes";

export const ToString: () => StringEdit = () => ({
  toString: (b: Buffer) => b.toString(),
  fromString: (s: string) => Buffer.from(s),
  next: (b: Buffer) => Buffer.from(""),
  prev: (b: Buffer) => Buffer.from(""),
  className: () => "",
});

export const ToHEX: () => StringEdit = () => ({
  toString: (b: Buffer) => b.toString("hex"),
  fromString: (s: string) => Buffer.from(s, "hex"),
  next: (b: Buffer) => Buffer.from(""),
  prev: (b: Buffer) => Buffer.from(""),
  className: () => "",
});

export const ToBase64: () => StringEdit = () => ({
  toString: (b: Buffer) => b.toString("base64"),
  fromString: (s: string) => Buffer.from(s, "base64"),
  next: (b: Buffer) => Buffer.from(""),
  prev: (b: Buffer) => Buffer.from(""),
  className: () => "",
});

export const ToSwitch: () => StringEdit = () => ({
  toString: (b: Buffer) => (b.toString() === "1" ? "ON" : "OFF"),
  fromString: (s: string) => Buffer.from(s === "ON" ? "1" : "0"),
  next: (b: Buffer) => Buffer.from(b.toString() === "1" ? "0" : "1"),
  prev: (b: Buffer) => Buffer.from(b.toString() === "1" ? "0" : "1"),
  className: () => "",
});

const getCharClass: (s?: string) => string = (s) =>
  s ? "[" + s.split("").join("][") + "]" : "";

export const ToIntlNumber: (
  options?: Intl.NumberFormatOptions
) => StringEdit = (options) => {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale, options);

  const parts: Intl.NumberFormatPart[] = intl.formatToParts(12345.6);
  const numerals: string[] = new Intl.NumberFormat(locale, {
    useGrouping: false,
  })
    .format(9876543210)
    .split("")
    .reverse();
  const inx = new Map<string, string>(
    numerals.map((d: string, i: number) => [d, i.toString()])
  );
  const group = new RegExp(
    `[${parts.find((d) => d.type === "group")?.value}]`,
    "g"
  );
  const decimal = new RegExp(
    `[${parts.find((d) => d.type === "decimal")?.value}]`
  );
  const currency = new RegExp(
    `[${parts.find((d) => d.type === "currency")?.value}]`
  );
  const unit = new RegExp(
    getCharClass(parts.find((d) => d.type === "unit")?.value)
  );

  const numeral = new RegExp(`[${numerals.join("")}]`, "g");
  const getindex = (d: string): string => inx.get(d) || "";

  return {
    toString: (b: Buffer) => {
      const s = b.toString();
      return s ? intl.format(Number(s)) : "";
    },
    fromString: (s: string) => {
      const strans = s
        .trim()
        .replace(group, "")
        .replace(currency, "")
        .replace(unit, "")
        .replace(decimal, ".")
        .replace(numeral, getindex);
      //we need to replace also currency and units

      return Buffer.from(strans);
    },
    next: (b: Buffer) => Buffer.from((Number(b.toString()) + 1).toString),
    prev: (b: Buffer) => Buffer.from((Number(b.toString()) - 1).toString),
    className: () => "myh-class_alignright",
  };
};
