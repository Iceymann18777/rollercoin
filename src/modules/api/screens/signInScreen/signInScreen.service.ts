import { GoToRestorePasswordScreenInput } from "./dto/goToRestorePasswordScreen.input";
import { GoToRestorePasswordScreenOutput } from "./dto/goToRestorePasswordScreen.output";
import { GoToSignUpScreenInput } from "./dto/goToSignUpScreen.input";
import { GoToSignUpScreenOutput } from "./dto/goToSignUpScreen.output";
import { SignInInput } from "./dto/signIn.input";
import { SignInOutput } from "./dto/signIn.output";
import {
  ClickSignInButtonFail,
  CompleteCaptchaFail,
  FillSignInFieldsFail,
  IsInSignInWindowScreenFail,
} from "./data/error.data";
import { SignInModule } from "./modules/signIn/signIn.module";

export class SignInScreenService {
  private signInModule: SignInModule;

  constructor() {
    this.signInModule = new SignInModule();
  }

  async signIn(input: SignInInput): SignInOutput {
    try {
      const page = input.page;

      const inSignInWindowScreen = this.signInModule.isInSignInWindowScreen({
        page,
      });
      if (!inSignInWindowScreen) {
        console.log(`[error] ${IsInSignInWindowScreenFail}`);
        return false;
      }

      const areSignInFieldsFilled = await this.signInModule.fillSignInFields({
        page,
        ...input,
      });
      if (!areSignInFieldsFilled) {
        console.log(`[error] ${FillSignInFieldsFail}`);
        return false;
      }

      const isCaptchaCompleted = await this.signInModule.completeCaptcha({
        page,
      });
      if (!isCaptchaCompleted) {
        console.log(`[error] ${CompleteCaptchaFail}`);
        return false;
      }

      const isSignInButtonClicked = await this.signInModule.clickSignInButton({
        page,
      });
      if (!isSignInButtonClicked) {
        console.log(`[error] ${ClickSignInButtonFail}`);
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async goToSignUpScreen(input: GoToSignUpScreenInput): GoToSignUpScreenOutput {
    return false;
  }

  async goToRestorePasswordScreen(
    input: GoToRestorePasswordScreenInput
  ): GoToRestorePasswordScreenOutput {
    return false;
  }
}
