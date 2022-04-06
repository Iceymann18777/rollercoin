import { Page } from "puppeteer";
import { FoundPattern } from "types/pattern.types";

export type GetCardPositionsInput = {
  page: Page;
  coinFlipContainerPattern: FoundPattern;
};
