import { createCursor } from "ghost-cursor";
import { GoToChooseGameScreenInput } from "./dto/goToChooseGameScreen.input";
import { GoToChooseGameScreenOutput } from "./dto/goToChooseGameScreen.output";

export class MenuService {
  async goToChooseGameScreen(
    input: GoToChooseGameScreenInput
  ): GoToChooseGameScreenOutput {
    const gamesButtonSelector = ".games-button > span";
    const gamesScreenIsLoadedSelector = ".pc-image";

    try {
      const { page } = input;

      const cursor = createCursor(page);
      const viewport = page.viewport();

      // ? jeśli szerokość >= 1200, to pojawia się przycisk 'Games'
      if (viewport.width >= 1200) {
        await page.waitForSelector(gamesButtonSelector);

        await cursor.move(gamesButtonSelector);
        await cursor.click();

        await page.waitForSelector(gamesScreenIsLoadedSelector);

        return true;
      } else {
        // TODO [error]
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
