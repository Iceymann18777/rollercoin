import { Page } from "puppeteer";

export type SignInInput = {
  page: Page;
  email: string;
  password: string;
};
