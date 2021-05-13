export const piepath: (args: {
  cx: number;
  cy: number;
  r: number;
  start: number;
  end: number;
  orientation?: number;
}) => string = ({ cx, cy, r, start, end, orientation = 0 }) => {
  return `M${cx + Math.cos(start) * r} ${
    cy + Math.sin(start) * r
  } A ${r} ${r} 1 ${orientation} 0 ${cx + Math.cos(end) * r} ${
    cy + Math.sin(end) * r
  } L ${cx} ${cy} Z`;
};

export const arcpath: (args: {
  cx: number;
  cy: number;
  r: number;
  start: number;
  end: number;
  orientation?: number;
}) => string = ({ cx, cy, r, start, end, orientation = 0 }) => {
  return `M${cx + Math.cos(start) * r} ${
    cy + Math.sin(start) * r
  } A ${r} ${r} 1 ${orientation} 0 ${cx + Math.cos(end) * r} ${
    cy + Math.sin(end) * r
  }`;
};

export const padvalue: (
  min: number,
  max: number,
  length?: number
) => (value: number) => number = (min, max, length = 1) => (value) => {
  let lengthvalue = (length * (value - min)) / (max - min);
  if (lengthvalue < 0) {
    return 0;
  }
  if (lengthvalue > length) {
    return length;
  }
  return lengthvalue;
};
