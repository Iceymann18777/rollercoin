import { MenuService } from "./menu.service";
import { GoToChooseGameScreenInput } from "./dto/goToChooseGameScreen.input";
import { GoToChooseGameScreenOutput } from "./dto/goToChooseGameScreen.output";

export class MenuModule {
  private menuService: MenuService;

  constructor() {
    this.menuService = new MenuService();
  }

  async goToChooseGameScreen(
    goToChooseGameScreenInput: GoToChooseGameScreenInput
  ): GoToChooseGameScreenOutput {
    return await this.menuService.goToChooseGameScreen(
      goToChooseGameScreenInput
    );
  }
}
