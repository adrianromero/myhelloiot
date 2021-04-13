export type StringFormat = {
  toString: (b: Buffer) => string;
  fromString: (s: string) => Buffer;
  className: () => string;
};

export const ToString: () => StringFormat = () => ({
  toString: (b: Buffer) => b.toString(),
  fromString: (s: string) => Buffer.from(s),
  className: () => "",
});

export const ToHEX: () => StringFormat = () => ({
  toString: (b: Buffer) => b.toString("hex"),
  fromString: (s: string) => Buffer.from(s, "hex"),
  className: () => "",
});

export const ToBase64: () => StringFormat = () => ({
  toString: (b: Buffer) => b.toString("base64"),
  fromString: (s: string) => Buffer.from(s, "base64"),
  className: () => "",
});

const getCharClass: (s?: string) => string = (s) =>
  s ? "[" + s.split("").join("][") + "]" : "";

export const ToIntlNumber: (
  options?: Intl.NumberFormatOptions
) => StringFormat = (options) => {
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
  console.log(getCharClass(parts.find((d) => d.type === "unit")?.value));

  const numeral = new RegExp(`[${numerals.join("")}]`, "g");
  const getindex = (d: string): string => inx.get(d) || "";

  return {
    toString: (b: Buffer) => intl.format(Number(b.toString())),
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
    className: () => "myh-class_alignright",
  };
};
