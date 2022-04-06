import { createCursor } from "ghost-cursor";
import { CaptchaModule } from "modules/api/captcha/captcha.module";
import { delay } from "utils/delay";
import fillField from "utils/fillField";
import { random } from "utils/random";
import { ClickSignInButtonInput } from "./dto/clickSignInButton.input";
import { ClickSignInButtonOutput } from "./dto/clickSignInButton.output";
import { CompleteCaptchaInput } from "./dto/completeCaptcha.input";
import { CompleteCaptchaOutput } from "./dto/completeCaptcha.output";
import { FillSignInFieldsInput } from "./dto/fillSignInFields.input";
import { FillSignInFieldsOutput } from "./dto/fillSignInFields.output";
import { IsInSignInWindowScreenInput } from "./dto/isInSignInWindowScreen.input";
import { IsInSignInWindowScreenOutput } from "./dto/isInSignInWindowScreen.output";

export class SignInService {
  private captchaModule: CaptchaModule;

  constructor() {
    this.captchaModule = new CaptchaModule();
  }

  async clickSignInButton(
    input: ClickSignInButtonInput
  ): ClickSignInButtonOutput {
    const signInButtonSelector = ".btn.btn-default-btn.w-100";

    const afterClickingSignInButtonDelayMinMax = [50, 400];

    try {
      const { page } = input;

      const cursor = createCursor(page);

      await page.waitForSelector(signInButtonSelector);

      await cursor.move(signInButtonSelector);
      await cursor.click();
      await delay(
        random(
          afterClickingSignInButtonDelayMinMax[0],
          afterClickingSignInButtonDelayMinMax[1]
        )
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async completeCaptcha(input: CompleteCaptchaInput): CompleteCaptchaOutput {
    const geetestCaptchaContainerSelector = ".geetest_btn";
    const geetestVerificationStatusSelector = ".geetest_radar_tip";

    try {
      const page = input.page;

      const isCompleted = await this.captchaModule.geetestCompleteCaptcha({
          geetestCompleteCaptchaInput: {
            page,
            captchaContainerSelector: geetestCaptchaContainerSelector,
            verificationStatusSelector: geetestVerificationStatusSelector,
          }
        });

      return isCompleted;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async fillSignInFields(input: FillSignInFieldsInput): FillSignInFieldsOutput {
    const emailFieldSelector = "#mail";
    const passwordFieldSelector = "#password";

    const afterFillingEmailFieldDelayMinMax = [50, 400];
    const afterFillingPasswordFieldDelayMinMax = [50, 400];

    try {
      const page = input.page;
      const emailFieldText = input.email;
      const passwordFieldText = input.password;

      const cursor = createCursor(page);

      await page.waitForSelector(emailFieldSelector);
      await page.waitForSelector(passwordFieldSelector);

      await cursor.move(emailFieldSelector);
      await cursor.click();
      await fillField(page, emailFieldSelector, emailFieldText);
      await delay(
        random(
          afterFillingEmailFieldDelayMinMax[0],
          afterFillingEmailFieldDelayMinMax[1]
        )
      );

      await cursor.move(passwordFieldSelector);
      await cursor.click();
      await fillField(page, passwordFieldSelector, passwordFieldText);
      await delay(
        random(
          afterFillingPasswordFieldDelayMinMax[0],
          afterFillingPasswordFieldDelayMinMax[1]
        )
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  isInSignInWindowScreen(
    input: IsInSignInWindowScreenInput
  ): IsInSignInWindowScreenOutput {
    const signInWindowScreenUrl = "https://rollercoin.com/sign-in";

    try {
      const page = input.page;

      const url = page.url();

      if (url === signInWindowScreenUrl) return true;

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
