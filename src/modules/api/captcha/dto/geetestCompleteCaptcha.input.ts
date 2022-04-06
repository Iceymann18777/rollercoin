import { Page } from "puppeteer";

export type GeetestCompleteCaptchaInput = {
  page: Page;
  captchaContainerSelector: string;
  verificationStatusSelector: string;
};
