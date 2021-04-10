export type StringFormat = {
  toString: (b: Buffer) => string;
  fromString: (s: string) => Buffer;
};

export const ToString: StringFormat = {
  toString: (b: Buffer) => b.toString(),
  fromString: (s: string) => Buffer.from(s),
};

export const ToHEX: StringFormat = {
  toString: (b: Buffer) => b.toString("hex"),
  fromString: (s: string) => Buffer.from(s, "hex"),
};

export const ToBase64: StringFormat = {
  toString: (b: Buffer) => b.toString("base64"),
  fromString: (s: string) => Buffer.from(s, "base64"),
};
