import { Page } from "puppeteer";
import { Game } from "types/game.types";

export type StartBotInput = {
  page: Page;
  game: Game;
};
