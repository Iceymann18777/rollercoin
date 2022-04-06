import { FindCoinFlipContainerPatternInput } from "./dto/findCoinFlipContainerPattern.input";
import { FindCoinFlipContainerPatternOutput } from "./dto/findCoinFlipContainerPattern.output";
import { FlipCardsInput } from "./dto/flipCards.input";
import { FlipCardsOutput } from "./dto/flipCards.output";
import { GetCardFrontsInput } from "./dto/getCardFronts.input";
import { GetCardFrontsOutput } from "./dto/getCardFronts.output";
import { GetCardPositionsInput } from "./dto/getCardPositions.input";
import { GetCardPositionsOutput } from "./dto/getCardPositions.output";
import { MatchCardsInput } from "./dto/matchCards.input";
import { MatchCardsOutput } from "./dto/matchCards.output";
import { RunBotService } from "./runBot.service";

export class RunBotModule {
  private runBotService: RunBotService;

  constructor() {
    this.runBotService = new RunBotService();
  }

  async findCoinFlipContainerPattern(
    findCoinFlipContainerPatternInput: FindCoinFlipContainerPatternInput
  ): FindCoinFlipContainerPatternOutput {
    return await this.runBotService.findCoinFlipContainerPattern(
      findCoinFlipContainerPatternInput
    );
  }

  async getCardPositions(
    getCardPositionsInput: GetCardPositionsInput
  ): GetCardPositionsOutput {
    return await this.runBotService.getCardPositions(getCardPositionsInput);
  }

  async getCardFronts(
    getCardFrontsInput: GetCardFrontsInput
  ): GetCardFrontsOutput {
    return await this.runBotService.getCardFronts(getCardFrontsInput);
  }

  async flipCards(flipCardsInput: FlipCardsInput): FlipCardsOutput {
    return await this.runBotService.flipCards(flipCardsInput);
  }

  async matchCards(matchCardsInput: MatchCardsInput): MatchCardsOutput {
    return await this.runBotService.matchCards(matchCardsInput);
  }
}
