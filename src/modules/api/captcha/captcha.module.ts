import { CaptchaService } from "./captcha.service";
import { GeetestCompleteCaptchaInput } from "./dto/geetestCompleteCaptcha.input";
import { GeetestCompleteCaptchaOutput } from "./dto/geetestCompleteCaptcha.output";

export class CaptchaModule {
  private captchaService: CaptchaService;

  constructor() {
    this.captchaService = new CaptchaService();
  }

  async geetestCompleteCaptcha(
{ geetestCompleteCaptchaInput }: { geetestCompleteCaptchaInput: GeetestCompleteCaptchaInput; }  ): GeetestCompleteCaptchaOutput {
    return await this.captchaService.geetestCompleteCaptcha(
      geetestCompleteCaptchaInput
    );
  }

  // TODO recaptchaCompleteCaptcha(recaptchaCompleteCaptchaInput: RecaptchaCompleteCaptchaInput): RecaptchaCompleteCaptchaOutput {}
}
