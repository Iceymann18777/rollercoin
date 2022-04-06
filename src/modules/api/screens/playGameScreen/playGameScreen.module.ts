import { PlayGameScreenService } from "./playGameScreen.service";
import { StartGameInput } from "./dto/startGame.input";
import { GainPowerInput } from "./dto/gainPower.input";
import { ChooseGameInput } from "./dto/chooseGame.input";
import { NewItemModalCollectInput } from "./dto/newItemModalCollect.input";
import { GoHomeInput } from "./dto/goHome.input";
import { StartBotInput } from "./dto/startBot.input";
import { ChooseGameOutput } from "./dto/chooseGame.output";
import { GainPowerOutput } from "./dto/gainPower.output";
import { GoHomeOutput } from "./dto/goHome.output";
import { NewItemModalCollectOutput } from "./dto/newItemModalCollect.output";
import { StartBotOutput } from "./dto/startBot.output";
import { StartGameOutput } from "./dto/startGame.output";
import { FindGainPowerButtonPatternInput } from "./dto/findGainPowerButtonPattern.input";
import { FindGainPowerButtonPatternOutput } from "./dto/findGainPowerButtonPattern.output";
import { FindStartButtonPatternInput } from "./dto/findStartButtonPattern.input";
import { FindStartButtonPatternOutput } from "./dto/findStartButtonPattern.output";

export class PlayGameScreenModule {
  private playGameScreenService: PlayGameScreenService;

  constructor() {
    this.playGameScreenService = new PlayGameScreenService();
  }

  async startBot(startBotInput: StartBotInput): StartBotOutput {
    return await this.playGameScreenService.startBot(startBotInput);
  }

  async findStartButtonPattern(
    findStartButtonPatternInput: FindStartButtonPatternInput
  ): FindStartButtonPatternOutput {
    return await this.playGameScreenService.findStartButtonPattern(
      findStartButtonPatternInput
    );
  }

  async startGame(startGameInput: StartGameInput): StartGameOutput {
    return await this.playGameScreenService.startGame(startGameInput);
  }

  async findGainPowerButtonPattern(
    findGainPowerButtonPatternInput: FindGainPowerButtonPatternInput
  ): FindGainPowerButtonPatternOutput {
    return await this.playGameScreenService.findGainPowerButtonPattern(
      findGainPowerButtonPatternInput
    );
  }

  async gainPower(gainPowerInput: GainPowerInput): GainPowerOutput {
    return await this.playGameScreenService.gainPower(gainPowerInput);
  }

  async goHome(goHomeInput: GoHomeInput): GoHomeOutput {
    return await this.playGameScreenService.goHome(goHomeInput);
  }

  async chooseGame(chooseGameInput: ChooseGameInput): ChooseGameOutput {
    return await this.playGameScreenService.chooseGame(chooseGameInput);
  }

  async newItemModalCollect(
    newItemModalCollectInput: NewItemModalCollectInput
  ): NewItemModalCollectOutput {
    return await this.playGameScreenService.newItemModalCollect(
      newItemModalCollectInput
    );
  }
}
