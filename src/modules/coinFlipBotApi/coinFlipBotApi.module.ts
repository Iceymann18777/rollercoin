import { RunBotInput } from "./dto/runBot.input";
import { CoinFlipBotApiService } from "./coinFlipBotApi.service";
import { RunBotOutput } from "./dto/runBot.output";

export class CoinFlipBotApiModule {
  private coinFlipBotApiService: CoinFlipBotApiService;

  constructor() {
    this.coinFlipBotApiService = new CoinFlipBotApiService();
  }

  async runBot(runBotInput: RunBotInput): RunBotOutput {
    return await this.coinFlipBotApiService.runBot(runBotInput);
  }
}
