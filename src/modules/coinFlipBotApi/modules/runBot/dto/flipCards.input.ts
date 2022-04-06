import { GhostCursor } from "ghost-cursor";
import { Delays, State } from "modules/coinFlipBotApi/types/shared.types";
import { Page } from "puppeteer";
import { Position } from "types/position.types";

export type FlipCardsInput = {
  page: Page;
  cursor: GhostCursor;
  firstCardPosition: Position;
  secondCardPosition: Position;
  state: State;
  delays: Delays;
};
