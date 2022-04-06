import { Page, Viewport } from "puppeteer";

export type PrepareWindowInput = {
  page: Page;
  userAgent: string;
  viewport: Viewport;
};
