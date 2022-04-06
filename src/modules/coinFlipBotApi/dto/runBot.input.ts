import { Page } from "puppeteer";

export type RunBotInput = {
  page: Page;
  windowScreenshot: Buffer | string;
};
