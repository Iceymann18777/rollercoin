import { createCursor } from "ghost-cursor";
import { ChooseGameInput } from "./dto/chooseGame.input";
import { ChooseGameOutput } from "./dto/chooseGame.output";

export class ChooseGameScreenService {
  async selectGame(input: ChooseGameInput): ChooseGameOutput {
    const selectGameButtonSelector =
      ".choose-game-item-container > div:first-of-type .game-start-button > button > span";

    try {
      const { page, game } = input;

      const cursor = createCursor(page);

      const selectGameButtonsElements = await page.$$(selectGameButtonSelector);

      const selectCoinclickButtonElement = selectGameButtonsElements[0];
      const selectTokenBlasterButtonElement = selectGameButtonsElements[1];
      const selectFlappyRocketButtonElement = selectGameButtonsElements[2];
      const selectCryptonoidButtonElement = selectGameButtonsElements[3];
      const selectCoinMatchButtonElement = selectGameButtonsElements[4];
      const selectCryptoHamsterButtonElement = selectGameButtonsElements[5];
      const select2048CoinsButtonElement = selectGameButtonsElements[6];
      const selectCoinFlipButtonElement = selectGameButtonsElements[7];
      const selectDrHamsterButtonElement = selectGameButtonsElements[8];
      const selectTokenSurferButtonElement = selectGameButtonsElements[9];
      const selectLamboRiderButtonElement = selectGameButtonsElements[10];

      switch (game) {
        case "Coinclick":
          await cursor.move(selectCoinclickButtonElement);
          await cursor.click();
          break;

        case "TokenBlaster":
          await cursor.click(selectTokenBlasterButtonElement);
          break;

        case "FlappyRocket":
          await cursor.click(selectFlappyRocketButtonElement);
          break;

        case "Cryptonoid":
          await cursor.click(selectCryptonoidButtonElement);
          break;

        case "CoinMatch":
          await cursor.click(selectCoinMatchButtonElement);
          break;

        case "CryptoHamster":
          await cursor.click(selectCryptoHamsterButtonElement);
          break;

        case "2048Coins":
          await cursor.click(select2048CoinsButtonElement);
          break;

        case "CoinFlip":
          await cursor.click(selectCoinFlipButtonElement);
          break;

        case "DrHamster":
          await cursor.click(selectDrHamsterButtonElement);
          break;

        case "TokenSurfer":
          await cursor.click(selectTokenSurferButtonElement);
          break;

        case "LamboRider":
          await cursor.click(selectLamboRiderButtonElement);
          break;

        default:
          break;
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
