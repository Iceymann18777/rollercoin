import { Page } from "puppeteer";
import { Game } from "types/game.types";

export type ChooseGameInput = {
  page: Page;
  game: Game;
};
