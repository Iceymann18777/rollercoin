import { State } from "modules/coinFlipBotApi/types/shared.types";
import { Page } from "puppeteer";
import { Position } from "types/position.types";

export type GetCardFrontsInput = {
  page: Page;
  state: State;
  firstCardPosition: Position;
  secondCardPosition: Position;
};
