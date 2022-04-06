export type Position = {
  x: [number, number];
  y: [number, number];
};

export type PositionNullable = {
  x: [null, null] | [number, number];
  y: [null, null] | [number, number];
};
