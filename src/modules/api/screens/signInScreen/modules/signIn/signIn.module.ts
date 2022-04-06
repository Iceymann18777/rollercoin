import { ClickSignInButtonInput } from "./dto/clickSignInButton.input";
import { ClickSignInButtonOutput } from "./dto/clickSignInButton.output";
import { CompleteCaptchaInput } from "./dto/completeCaptcha.input";
import { CompleteCaptchaOutput } from "./dto/completeCaptcha.output";
import { FillSignInFieldsInput } from "./dto/fillSignInFields.input";
import { FillSignInFieldsOutput } from "./dto/fillSignInFields.output";
import { IsInSignInWindowScreenInput } from "./dto/isInSignInWindowScreen.input";
import { IsInSignInWindowScreenOutput } from "./dto/isInSignInWindowScreen.output";
import { SignInService } from "./signIn.service";

export class SignInModule {
  private signInService: SignInService;

  constructor() {
    this.signInService = new SignInService();
  }

  async clickSignInButton(
    clickSignInButtonInput: ClickSignInButtonInput
  ): ClickSignInButtonOutput {
    return await this.signInService.clickSignInButton(clickSignInButtonInput);
  }

  async completeCaptcha(
    completeCaptchaInput: CompleteCaptchaInput
  ): CompleteCaptchaOutput {
    return await this.signInService.completeCaptcha(completeCaptchaInput);
  }

  async fillSignInFields(
    fillSignInFieldsInput: FillSignInFieldsInput
  ): FillSignInFieldsOutput {
    return await this.signInService.fillSignInFields(fillSignInFieldsInput);
  }

  isInSignInWindowScreen(
    isInSignInWindowScreenInput: IsInSignInWindowScreenInput
  ): IsInSignInWindowScreenOutput {
    return this.signInService.isInSignInWindowScreen(
      isInSignInWindowScreenInput
    );
  }
}
