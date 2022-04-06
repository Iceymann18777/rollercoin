import { RunBotInput } from "./dto/runBot.input";
import { Coins2048BotApiService } from "./coins2048BotApi.service";
import { RunBotOutput } from "./dto/runBot.output";

export class Coins2048BotApiModule {
  private coinFlipBotApiService: Coins2048BotApiService;

  constructor() {
    this.coinFlipBotApiService = new Coins2048BotApiService();
  }

  async runBot(runBotInput: RunBotInput): RunBotOutput {
    return await this.coinFlipBotApiService.runBot(runBotInput);
  }
}
