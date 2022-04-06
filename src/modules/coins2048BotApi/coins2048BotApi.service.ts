import { RunBotInput } from "./dto/runBot.input";
import { createCursor } from "ghost-cursor";
import convertFoundPatternToPosition from "utils/convertFoundPatternToPosition";
import { Delays, State } from "./types/shared.types";
import { RunBotOutput } from "./dto/runBot.output";
import { delay } from "utils/delay";
import { random } from "utils/random";
import { PlayGameScreenModule } from "modules/api/screens/playGameScreen/playGameScreen.module";

export class Coins2048BotApiService {
  // ? config
  private delays: Delays;
  private numberOfMovesBeforeFindingGainPowerButtonMinMax: [number, number];

  // ? modules
  private playGameScreenModule: PlayGameScreenModule;

  // ? logic
  private state: State;

  constructor() {
    // ? config
    this.delays = {
      afterKeyboardPressMinMax: [150, 220],
    };
    this.numberOfMovesBeforeFindingGainPowerButtonMinMax = [5, 10];

    // ? modules
    this.playGameScreenModule = new PlayGameScreenModule();

    // ? logic
    this.state = {
      availableMoves: ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"],
    };
  }

  async runBot(input: RunBotInput): RunBotOutput {
    try {
      const { page } = input;

      let isGainPowerButtonPatternFound = false;

      while (!isGainPowerButtonPatternFound) {
        const numberOfMoves = random(
          this.numberOfMovesBeforeFindingGainPowerButtonMinMax[0],
          this.numberOfMovesBeforeFindingGainPowerButtonMinMax[1]
        );

        for (let i = 0; i < numberOfMoves; i++) {
          const randomMove = this.state.availableMoves[random(0, 3)];

          await page.keyboard.press(randomMove);
          await delay(
            random(
              this.delays.afterKeyboardPressMinMax[0],
              this.delays.afterKeyboardPressMinMax[1]
            )
          );
        }

        const foundPattern = await this.playGameScreenModule.findGainPowerButtonPattern(
          {
            page,
          }
        );
        if (foundPattern !== false) {
          isGainPowerButtonPatternFound = true;
        }
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
