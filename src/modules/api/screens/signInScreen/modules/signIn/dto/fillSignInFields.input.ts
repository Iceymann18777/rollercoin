import { Page } from "puppeteer";

export type FillSignInFieldsInput = {
  page: Page;
  email: string;
  password: string;
};
