import { RunBotInput } from "./dto/runBot.input";
import { createCursor } from "ghost-cursor";
import convertFoundPatternToPosition from "utils/convertFoundPatternToPosition";
import { Delays, State } from "./types/shared.types";
import { RunBotModule } from "./modules/runBot/runBot.module";
import { RunBotOutput } from "./dto/runBot.output";
import { delay } from "utils/delay";
import { random } from "utils/random";

export class CoinFlipBotApiService {
  // ? config
  private delays: Delays;

  // ? modules
  private runBotModule: RunBotModule;

  // ? logic
  private state: State;

  constructor() {
    // ? config
    this.delays = {
      firstCardAfterMoveToMinMax: [50, 150],
      firstCardAfterMouseDownMinMax: [50, 100],
      firstCardAfterMouseUpMinMax: [0, 0],

      secondCardAfterMoveToMinMax: [50, 150],
      secondCardAfterMouseDownMinMax: [50, 100],
      secondCardAfterMouseUpMinMax: [290, 291],
    };

    // ? modules
    this.runBotModule = new RunBotModule();

    // ? logic
    this.state = {
      gameContainerPosition: {
        x: [null, null],
        y: [null, null],
      },
      cardPositions: [],
      cardItems: {
        bnb: [],
        btc: [],
        eth: [],
        ltc: [],
        xmr: [],
        eos: [],
        rlt: [],
        xrp: [],
        xml: [],
        usdt: [],
      },
    };
  }

  async runBot(input: RunBotInput): RunBotOutput {
    try {
      const { page, windowScreenshot } = input;

      const cursor = createCursor(page);

      const foundCoinFlipContainerPattern = await this.runBotModule.findCoinFlipContainerPattern(
        {
          windowScreenshot,
        }
      );
      if (!foundCoinFlipContainerPattern) {
        // TODO [error]
        return false;
      }

      this.state.gameContainerPosition = convertFoundPatternToPosition(
        foundCoinFlipContainerPattern
      );

      const cardPositions = await this.runBotModule.getCardPositions({
        page,
        coinFlipContainerPattern: foundCoinFlipContainerPattern,
      });
      if (!cardPositions) {
        // TODO [error]
        return false;
      }

      this.state.cardPositions = cardPositions;

      let index = 0;
      while (index < this.state.cardPositions.length) {
        const firstCardPosition = this.state.cardPositions[index];
        const secondCardPosition = this.state.cardPositions[index + 1];

        const flippedCards = await this.runBotModule.flipCards({
          page,
          cursor,
          firstCardPosition,
          secondCardPosition,
          delays: this.delays,
          state: this.state,
        });
        if (!flippedCards) {
          // TODO [error]
          return false;
        }

        const cardFronts = await this.runBotModule.getCardFronts({
          page,
          state: this.state,
          firstCardPosition,
          secondCardPosition,
        });
        if (!cardFronts) {
          // TODO [error]
          return false;
        }

        const newCardItems = this.state.cardItems;

        if (cardFronts.firstCardFront === cardFronts.secondCardFront) {
          newCardItems[cardFronts.firstCardFront].pop();

          this.state.cardItems = newCardItems;
        } else {
          newCardItems[cardFronts.firstCardFront].push(firstCardPosition);
          newCardItems[cardFronts.secondCardFront].push(secondCardPosition);

          this.state.cardItems = newCardItems;

          const matchedCards = await this.runBotModule.matchCards({
            page,
            cursor,
            delays: this.delays,
            state: this.state,
          });
          if (!matchedCards) {
            // TODO [error]
            return false;
          }
        }

        await delay(random(100, 200));
        index += 2;
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
