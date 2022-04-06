import { Viewport } from "puppeteer";

export type OpenWindowInput = {
  headless: boolean;
  ignoreDefaultArgs: string[];
  args: string[];
  userAgent: string;
  viewport: Viewport;
};
