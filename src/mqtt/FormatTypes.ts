export type StringFormat = {
  toString: (b: Buffer) => string;
  fromString: (s: string) => Buffer;
  next: (b: Buffer) => Buffer;
  prev: (b: Buffer) => Buffer;
  className: () => string;
};
