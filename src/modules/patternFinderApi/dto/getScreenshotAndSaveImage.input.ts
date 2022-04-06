import { Page } from "puppeteer";

export type GetScreenshotAndSaveImageInput = {
  page: Page;
  name: string;
};
