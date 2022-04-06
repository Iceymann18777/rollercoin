import { GoToRestorePasswordScreenInput } from "./dto/goToRestorePasswordScreen.input";
import { GoToRestorePasswordScreenOutput } from "./dto/goToRestorePasswordScreen.output";
import { GoToSignUpScreenInput } from "./dto/goToSignUpScreen.input";
import { GoToSignUpScreenOutput } from "./dto/goToSignUpScreen.output";
import { SignInInput } from "./dto/signIn.input";
import { SignInOutput } from "./dto/signIn.output";
import { SignInScreenService } from "./signInScreen.service";

export class SignInScreenModule {
  private signInScreenService: SignInScreenService;

  constructor() {
    this.signInScreenService = new SignInScreenService();
  }

  async signIn(signInInput: SignInInput): SignInOutput {
    return await this.signInScreenService.signIn(signInInput);
  }

  async goToSignUpScreen(
    goToSignUpScreenInput: GoToSignUpScreenInput
  ): GoToSignUpScreenOutput {
    return await this.signInScreenService.goToSignUpScreen(
      goToSignUpScreenInput
    );
  }

  async goToRestorePasswordScreen(
    goToRestorePasswordScreenInput: GoToRestorePasswordScreenInput
  ): GoToRestorePasswordScreenOutput {
    return await this.signInScreenService.goToRestorePasswordScreen(
      goToRestorePasswordScreenInput
    );
  }
}
