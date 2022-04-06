import { StartGameInput } from "./dto/startGame.input";
import * as fs from "fs";
import * as path from "path";
import { PatternFinderApiModule } from "modules/patternFinderApi/patternFinderApi.module";
import { createCursor } from "ghost-cursor";
import { random } from "utils/random";
import { Vector } from "ghost-cursor/lib/math";
import { delay } from "utils/delay";
import { GainPowerInput } from "./dto/gainPower.input";
import { ChooseGameInput } from "./dto/chooseGame.input";
import { NewItemModalCollectInput } from "./dto/newItemModalCollect.input";
import { GoHomeInput } from "./dto/goHome.input";
import { StartBotInput } from "./dto/startBot.input";
import { CoinFlipBotApiModule } from "modules/coinFlipBotApi/coinFlipBotApi.module";
import { ChooseGameOutput } from "./dto/chooseGame.output";
import { GainPowerOutput } from "./dto/gainPower.output";
import { GoHomeOutput } from "./dto/goHome.output";
import { NewItemModalCollectOutput } from "./dto/newItemModalCollect.output";
import { StartBotOutput } from "./dto/startBot.output";
import { StartGameOutput } from "./dto/startGame.output";
import { Coins2048BotApiModule } from "modules/coins2048BotApi/coins2048BotApi.module";
import { FindGainPowerButtonPatternInput } from "./dto/findGainPowerButtonPattern.input";
import { FindGainPowerButtonPatternOutput } from "./dto/findGainPowerButtonPattern.output";
import { PatternMoreThanOneFound, PatternNotFound } from "src/data/error.data";
import { FindStartButtonPatternInput } from "./dto/findStartButtonPattern.input";
import { FindStartButtonPatternOutput } from "./dto/findStartButtonPattern.output";

export class PlayGameScreenService {
  private patternFinderApiModule: PatternFinderApiModule;
  private coinFlipBotApiModule: CoinFlipBotApiModule;
  private coins2048BotApiModule: Coins2048BotApiModule;

  constructor() {
    this.patternFinderApiModule = new PatternFinderApiModule();
    this.coinFlipBotApiModule = new CoinFlipBotApiModule();
    this.coins2048BotApiModule = new Coins2048BotApiModule();
  }

  async startBot(input: StartBotInput): StartBotOutput {
    try {
      const page = input.page;
      const game = input.game;

      const viewport = page.viewport();

      const windowScreenshot = await page.screenshot({
        type: "png",
        clip: {
          x: 0,
          y: 0,
          width: viewport.width,
          height: viewport.height,
        },
        omitBackground: true,
      });

      switch (game) {
        case "CoinFlip":
          await this.coinFlipBotApiModule.runBot({
            page,
            windowScreenshot,
          });
          break;

        case "Coins2048":
          await this.coins2048BotApiModule.runBot({
            page,
          });
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

  async findStartButtonPattern(
    input: FindStartButtonPatternInput
  ): FindStartButtonPatternOutput {
    try {
      const { page } = input;

      const viewport = page.viewport();

      const pattern = fs.readFileSync(
        path.resolve(__dirname, "./patterns/startButton.pattern.png")
      );

      const findWithin = await page.screenshot({
        type: "png",
        clip: {
          x: 0,
          y: 0,
          width: viewport.width,
          height: viewport.height,
        },
        omitBackground: true,
      });

      const foundPatterns = await this.patternFinderApiModule.findPatternWithinImage(
        {
          pattern,
          findWithin,
        }
      );
      if (!foundPatterns) {
        // TODO [error]
        return false;
      }
      if (foundPatterns.length === 0) {
        console.log(`[error] ${PatternNotFound} "startButton.pattern.png"`);
        return false;
      }
      if (foundPatterns.length > 1) {
        console.log(
          `[error] ${PatternMoreThanOneFound} "startButton.pattern.png"`
        );
        return false;
      }

      return foundPatterns[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async startGame(input: StartGameInput): StartGameOutput {
    const afterMovingToStartButtonDelayMinMax = [50, 400];
    const afterClickingStartButtonDelayMinMax = [50, 400];

    try {
      const page = input.page;

      const cursor = createCursor(page);

      const foundPattern = await this.findStartButtonPattern({
        page,
      });
      if (!foundPattern) {
        // TODO [error]
        return false;
      }

      const foundPatternRandomVector: Vector = {
        x: random(foundPattern.x, foundPattern.x + foundPattern.width),
        y: random(foundPattern.y, foundPattern.y + foundPattern.height),
      };

      await cursor.moveTo(foundPatternRandomVector);
      await delay(
        random(
          afterMovingToStartButtonDelayMinMax[0],
          afterMovingToStartButtonDelayMinMax[1]
        )
      );
      await cursor.click();
      await delay(
        random(
          afterClickingStartButtonDelayMinMax[0],
          afterClickingStartButtonDelayMinMax[1]
        )
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async findGainPowerButtonPattern(
    input: FindGainPowerButtonPatternInput
  ): FindGainPowerButtonPatternOutput {
    try {
      const { page } = input;

      const viewport = page.viewport();

      const pattern = fs.readFileSync(
        path.resolve(__dirname, "./patterns/gainPowerButton.pattern.png")
      );

      const findWithin = await page.screenshot({
        type: "png",
        clip: {
          x: 0,
          y: 0,
          width: viewport.width,
          height: viewport.height,
        },
        omitBackground: true,
      });

      const foundPatterns = await this.patternFinderApiModule.findPatternWithinImage(
        {
          pattern,
          findWithin,
        }
      );
      if (!foundPatterns) {
        // TODO [error]
        return false;
      }
      if (foundPatterns.length === 0) {
        console.log(`[error] ${PatternNotFound} "gainPowerButton.pattern.png"`);
        return false;
      }
      if (foundPatterns.length > 1) {
        console.log(
          `[error] ${PatternMoreThanOneFound} "gainPowerButton.pattern.png"`
        );
        return false;
      }

      return foundPatterns[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async gainPower(input: GainPowerInput): GainPowerOutput {
    const afterMovingToGainPowerButtonDelayMinMax = [50, 400];
    const afterClickingGainPowerButtonDelayMinMax = [50, 400];

    try {
      const { page } = input;

      const cursor = createCursor(page);

      const foundPattern = await this.findGainPowerButtonPattern({
        page,
      });
      if (!foundPattern) {
        // TODO [error]
        return false;
      }
      const foundPatternRandomVector: Vector = {
        x: random(foundPattern.x, foundPattern.x + foundPattern.width),
        y: random(foundPattern.y, foundPattern.y + foundPattern.height),
      };

      await cursor.moveTo(foundPatternRandomVector);
      await delay(
        random(
          afterMovingToGainPowerButtonDelayMinMax[0],
          afterMovingToGainPowerButtonDelayMinMax[1]
        )
      );
      await cursor.click();
      await delay(
        random(
          afterClickingGainPowerButtonDelayMinMax[0],
          afterClickingGainPowerButtonDelayMinMax[1]
        )
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async goHome(input: GoHomeInput): GoHomeOutput {
    // ? find by selector
    const goHomeButtonSelector = ".router-btns > a:first-of-type";

    const afterMovingToGoHomeButtonDelayMinMax = [50, 400];
    const afterClickingGoHomeButtonDelayMinMax = [50, 400];

    try {
      const page = input.page;

      const cursor = createCursor(page);

      const goHomeButtonElement = await page.$(goHomeButtonSelector);

      await cursor.move(goHomeButtonElement);
      await delay(
        random(
          afterMovingToGoHomeButtonDelayMinMax[0],
          afterMovingToGoHomeButtonDelayMinMax[1]
        )
      );
      await cursor.click();
      await delay(
        random(
          afterClickingGoHomeButtonDelayMinMax[0],
          afterClickingGoHomeButtonDelayMinMax[1]
        )
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async chooseGame(input: ChooseGameInput): ChooseGameOutput {
    // ? find by selector
    const chooseGameButtonSelector = ".router-btns > a:last-of-type";

    const afterMovingToChooseGameButtonDelayMinMax = [50, 400];
    const afterClickingChooseGameButtonDelayMinMax = [50, 400];

    try {
      const page = input.page;

      const cursor = createCursor(page);

      const chooseGameButtonElement = await page.$(chooseGameButtonSelector);

      await cursor.move(chooseGameButtonElement);
      await delay(
        random(
          afterMovingToChooseGameButtonDelayMinMax[0],
          afterMovingToChooseGameButtonDelayMinMax[1]
        )
      );
      await cursor.click();
      await delay(
        random(
          afterClickingChooseGameButtonDelayMinMax[0],
          afterClickingChooseGameButtonDelayMinMax[1]
        )
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }

    // ? find by pattern
    // const afterMovingToChooseGameButtonDelayMinMax = [50, 400];
    // const afterClickingChooseGameButtonDelayMinMax = [50, 400];

    // try {
    //   const page = input.page;

    //   const viewport = page.viewport();
    //   const cursor = createCursor(page);

    //   const pattern = fs.readFileSync(
    //     path.resolve(__dirname, "./patterns/chooseGameButton.pattern.png")
    //   );

    //   const findWithin = await page.screenshot({
    //     type: "png",
    //     clip: {
    //       x: 0,
    //       y: 0,
    //       width: viewport.width,
    //       height: viewport.height,
    //     },
    //     omitBackground: true,
    //   });

    //   const foundPatterns = await this.patternFinderApiModule.findPatternWithinImage(
    //     {
    //       pattern,
    //       findWithin,
    //     }
    //   );

    //   if (foundPatterns.length === 0) {
    //     console.log(
    //       '[error] Nie znaleziono zadnego patternu "chooseGameButton.pattern.png"'
    //     );
    //     return false;
    //   } else if (foundPatterns.length > 1) {
    //     console.log(
    //       '[error] Znaleziono więcej niz jeden pattern "chooseGameButton.pattern.png"'
    //     );
    //     return false;
    //   } else {
    //     const foundPattern = foundPatterns[0];
    //     const foundPatternRandomVector: Vector = {
    //       x: random(foundPattern.x, foundPattern.x + foundPattern.width),
    //       y: random(foundPattern.y, foundPattern.y + foundPattern.height),
    //     };

    //     await cursor.moveTo(foundPatternRandomVector);
    //     await delay(
    //       random(
    //         afterMovingToChooseGameButtonDelayMinMax[0],
    //         afterMovingToChooseGameButtonDelayMinMax[1]
    //       )
    //     );
    //     await cursor.click();
    //     await delay(
    //       random(
    //         afterClickingChooseGameButtonDelayMinMax[0],
    //         afterClickingChooseGameButtonDelayMinMax[1]
    //       )
    //     );

    //     return true;
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return false;
    // }
  }

  async newItemModalCollect(
    input: NewItemModalCollectInput
  ): NewItemModalCollectOutput {
    // ? find by selector
    const collectButtonSelector = ".modal-content .collect-button > button";

    const afterMovingToCollectButtonDelayMinMax = [50, 400];
    const afterClickingCollectButtonDelayMinMax = [50, 400];

    try {
      const page = input.page;

      const cursor = createCursor(page);

      const collectButtonElement = await page.$(collectButtonSelector);

      await cursor.move(collectButtonElement);
      await delay(
        random(
          afterMovingToCollectButtonDelayMinMax[0],
          afterMovingToCollectButtonDelayMinMax[1]
        )
      );
      await cursor.click();
      await delay(
        random(
          afterClickingCollectButtonDelayMinMax[0],
          afterClickingCollectButtonDelayMinMax[1]
        )
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
    // ? find by pattern
    // const afterMovingToCollectButtonDelayMinMax = [50, 400];
    // const afterClickingCollectButtonDelayMinMax = [50, 400];

    // try {
    //   const page = input.page;

    //   const viewport = page.viewport();
    //   const cursor = createCursor(page);

    //   const pattern = fs.readFileSync(
    //     path.resolve(__dirname, "./patterns/NewItemModalCollectButton.pattern.png")
    //   );

    //   const findWithin = await page.screenshot({
    //     type: "png",
    //     clip: {
    //       x: 0,
    //       y: 0,
    //       width: viewport.width,
    //       height: viewport.height,
    //     },
    //     omitBackground: true,
    //   });

    //   const foundPatterns = await this.patternFinderApiModule.findPatternWithinImage(
    //     {
    //       pattern,
    //       findWithin,
    //     }
    //   );

    //   if (foundPatterns.length === 0) {
    //     console.log(
    //       '[error] Nie znaleziono zadnego patternu "NewItemModalCollectButton.pattern.png"'
    //     );
    //     return false;
    //   } else if (foundPatterns.length > 1) {
    //     console.log(
    //       '[error] Znaleziono więcej niz jeden pattern "NewItemModalCollectButton.pattern.png"'
    //     );
    //     return false;
    //   } else {
    //     const foundPattern = foundPatterns[0];
    //     const foundPatternRandomVector: Vector = {
    //       x: random(foundPattern.x, foundPattern.x + foundPattern.width),
    //       y: random(foundPattern.y, foundPattern.y + foundPattern.height),
    //     };

    //     await cursor.moveTo(foundPatternRandomVector);
    //     await delay(
    //       random(
    //         afterMovingToCollectButtonDelayMinMax[0],
    //         afterMovingToCollectButtonDelayMinMax[1]
    //       )
    //     );
    //     await cursor.click();
    //     await delay(
    //       random(
    //         afterClickingCollectButtonDelayMinMax[0],
    //         afterClickingCollectButtonDelayMinMax[1]
    //       )
    //     );

    //     return true;
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return false;
    // }
  }
}
