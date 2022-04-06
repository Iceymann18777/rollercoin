import { Page } from "puppeteer";

export type SlidePuzzlePieceInput = {
  page: Page;
  center: {
    x: number;
    y: number;
  };
};
