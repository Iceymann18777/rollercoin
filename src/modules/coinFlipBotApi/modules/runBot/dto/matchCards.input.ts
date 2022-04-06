import { GhostCursor } from "ghost-cursor";
import { Delays, State } from "modules/coinFlipBotApi/types/shared.types";
import { Page } from "puppeteer";

export type MatchCardsInput = {
  page: Page;
  cursor: GhostCursor;
  state: State;
  delays: Delays;
};
