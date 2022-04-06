import * as fs from "fs";
import * as path from "path";
import { Patterns } from "./types/shared.types";
import { PatternFinderApiModule } from "modules/patternFinderApi/patternFinderApi.module";
import { PatternMoreThanOneFound, PatternNotFound } from "src/data/error.data";
import { FindCoinFlipContainerPatternInput } from "./dto/findCoinFlipContainerPattern.input";
import { GetCardPositionsInput } from "./dto/getCardPositions.input";
import screenshot from "utils/screenshot";
import { GetCardPositionsResponseData } from "./types/getCardPositions.types";
import { GetCardFrontsInput } from "./dto/getCardFronts.input";
import { GetCardFrontsResponseData } from "./types/getCardFronts.types";
import { GetCardFrontsOutput } from "./dto/getCardFronts.output";
import { FindCoinFlipContainerPatternOutput } from "./dto/findCoinFlipContainerPattern.output";
import { GetCardPositionsOutput } from "./dto/getCardPositions.output";
import { FlipCardsOutput } from "./dto/flipCards.output";
import { FlipCardsInput } from "./dto/flipCards.input";
import moveToAndClick from "utils/moveToAndClick";
import { MatchCardsInput } from "./dto/matchCards.input";
import { MatchCardsOutput } from "./dto/matchCards.output";

export class RunBotService {
  // ? config
  private patterns: Patterns;

  // ? modules
  private patternFinderApiModule: PatternFinderApiModule;

  constructor() {
    // ? config
    this.patterns = {
      coinFlipContainer: "./patterns/coinFlipContainer.pattern.png",
    };

    // ? modules
    this.patternFinderApiModule = new PatternFinderApiModule();
  }

  async findCoinFlipContainerPattern(
    input: FindCoinFlipContainerPatternInput
  ): FindCoinFlipContainerPatternOutput {
    const windowScreenshot = input.windowScreenshot;

    const coinFlipContainerPattern = fs.readFileSync(
      path.resolve(__dirname, this.patterns.coinFlipContainer)
    );

    const foundPatterns = await this.patternFinderApiModule.findPatternWithinImage(
      {
        pattern: coinFlipContainerPattern,
        findWithin: windowScreenshot,
      }
    );
    if (!foundPatterns) {
      // TODO [error]
      return false;
    }

    if (foundPatterns.length === 0) {
      console.log(
        `[error] ${PatternNotFound} ${this.patterns.coinFlipContainer}`
      );
      return false;
    } else if (foundPatterns.length > 1) {
      console.log(
        `[error] ${PatternMoreThanOneFound} ${this.patterns.coinFlipContainer}`
      );
      return false;
    } else {
      const foundCoinFlipContainerPattern = foundPatterns[0];

      return foundCoinFlipContainerPattern;
    }
  }

  async getCardPositions(input: GetCardPositionsInput): GetCardPositionsOutput {
    try {
      const page = input.page;
      const coinFlipContainerPattern = input.coinFlipContainerPattern;

      const coinFlipContainerScreenshot = await screenshot(
        page,
        "png",
        {
          x: coinFlipContainerPattern.x,
          y: coinFlipContainerPattern.y,
          width: coinFlipContainerPattern.width,
          height: coinFlipContainerPattern.height,
        },
        true,
        true
      );
      if (!coinFlipContainerScreenshot) {
        // TODO [error]
        return false;
      }

      const body = {
        screenshot: coinFlipContainerScreenshot.toString("base64"),
      };

      const response = await fetch(
        `${process.env.coinFlipBotUrl}/getCardPositions`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data: GetCardPositionsResponseData = await response.json();
      const cardPositions = data.cardPositions;

      return cardPositions;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getCardFronts(input: GetCardFrontsInput): GetCardFrontsOutput {
    try {
      const page = input.page;
      const state = input.state;
      const firstCardPosition = input.firstCardPosition;
      const secondCardPosition = input.secondCardPosition;

      const firstCardScreenshot = await screenshot(
        page,
        "png",
        {
          x: state.gameContainerPosition.x[0] + firstCardPosition.x[0],
          y: state.gameContainerPosition.y[0] + firstCardPosition.y[0],
          width: firstCardPosition.x[1] - firstCardPosition.x[0],
          height: firstCardPosition.y[1] - firstCardPosition.y[0],
        },
        true,
        true
      );
      if (!firstCardScreenshot) {
        // TODO [error]
        return false;
      }

      const secondCardScreenshot = await screenshot(
        page,
        "png",
        {
          x: state.gameContainerPosition.x[0] + secondCardPosition.x[0],
          y: state.gameContainerPosition.y[0] + secondCardPosition.y[0],
          width: secondCardPosition.x[1] - secondCardPosition.x[0],
          height: secondCardPosition.y[1] - secondCardPosition.y[0],
        },
        true,
        true
      );
      if (!secondCardScreenshot) {
        // TODO [error]
        return false;
      }

      const body = {
        firstScreenshot: firstCardScreenshot.toString("base64"),
        secondScreenshot: secondCardScreenshot.toString("base64"),
      };

      const response = await fetch(
        `${process.env.coinFlipBotUrl}/getCardFronts`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data: GetCardFrontsResponseData = await response.json();
      const firstCardFront = data.firstScreenshot;
      const secondCardFront = data.secondScreenshot;

      return {
        firstCardFront,
        secondCardFront,
      };
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async flipCards(input: FlipCardsInput): FlipCardsOutput {
    try {
      const {
        page,
        cursor,
        firstCardPosition,
        secondCardPosition,
        state,
        delays,
      } = input;

      await moveToAndClick(
        page,
        cursor,
        firstCardPosition,
        state.gameContainerPosition,
        {
          button: "left",
        },
        {
          afterMoveToMinMax: delays.firstCardAfterMoveToMinMax,
          afterMouseDownMinMax: delays.firstCardAfterMouseDownMinMax,
          afterMouseUpMinMax: delays.firstCardAfterMouseUpMinMax,
        }
      );

      await moveToAndClick(
        page,
        cursor,
        secondCardPosition,
        state.gameContainerPosition,
        {
          button: "left",
        },
        {
          afterMoveToMinMax: delays.secondCardAfterMoveToMinMax,
          afterMouseDownMinMax: delays.secondCardAfterMouseDownMinMax,
          afterMouseUpMinMax: delays.secondCardAfterMouseUpMinMax,
        }
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async matchCards(input: MatchCardsInput): MatchCardsOutput {
    try {
      const { page, cursor, state, delays } = input;

      for (const [key, value] of Object.entries(state.cardItems)) {
        if (value.length === 2) {
          await moveToAndClick(
            page,
            cursor,
            state.cardItems[key][0],
            state.gameContainerPosition,
            {
              button: "left",
            },
            {
              afterMoveToMinMax: delays.secondCardAfterMoveToMinMax,
              afterMouseDownMinMax: delays.secondCardAfterMouseDownMinMax,
              afterMouseUpMinMax: delays.secondCardAfterMouseUpMinMax,
            }
          );

          await moveToAndClick(
            page,
            cursor,
            state.cardItems[key][1],
            state.gameContainerPosition,
            {
              button: "left",
            },
            {
              afterMoveToMinMax: delays.secondCardAfterMoveToMinMax,
              afterMouseDownMinMax: delays.secondCardAfterMouseDownMinMax,
              afterMouseUpMinMax: delays.secondCardAfterMouseUpMinMax,
            }
          );

          state.cardItems[key] = [];
        }
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
