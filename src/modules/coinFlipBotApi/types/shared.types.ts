import { Position, PositionNullable } from "types/position.types";

export type Delays = {
  firstCardAfterMoveToMinMax: [number, number];
  firstCardAfterMouseDownMinMax: [number, number];
  firstCardAfterMouseUpMinMax: [number, number];
  secondCardAfterMoveToMinMax: [number, number];
  secondCardAfterMouseDownMinMax: [number, number];
  secondCardAfterMouseUpMinMax: [number, number];
};

export type State = {
  gameContainerPosition: PositionNullable;
  cardPositions: Position[];
  cardItems: {
    bnb: Position[];
    btc: Position[];
    eth: Position[];
    ltc: Position[];
    xmr: Position[];
    eos: Position[];
    rlt: Position[];
    xrp: Position[];
    xml: Position[];
    usdt: Position[];
  };
};
