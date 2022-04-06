import { ChooseGameScreenService } from "./chooseGameScreen.service";
import { ChooseGameInput } from "./dto/chooseGame.input";
import { ChooseGameOutput } from "./dto/chooseGame.output";

export class ChooseGameScreenModule {
  private chooseGameScreenService: ChooseGameScreenService;

  constructor() {
    this.chooseGameScreenService = new ChooseGameScreenService();
  }

  async selectGame(selectGameInput: ChooseGameInput): ChooseGameOutput {
    return await this.chooseGameScreenService.selectGame(selectGameInput);
  }
}
