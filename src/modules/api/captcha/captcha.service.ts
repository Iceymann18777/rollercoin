import { createCursor } from "ghost-cursor";
import { GeetestVerificationStatus } from "types/captcha.types";
import { delay } from "utils/delay";
import getAttribute from "utils/getAttribute";
import { GeetestCompleteCaptchaInput } from "./dto/geetestCompleteCaptcha.input";
import { GeetestCompleteCaptchaOutput } from "./dto/geetestCompleteCaptcha.output";
import { GeetestCompleteCaptchaModule } from "./modules/geetestCompleteCaptcha/geetestCompleteCaptcha.module";

export class CaptchaService {
  // ? modules
  private geetestCompleteCaptchaModule: GeetestCompleteCaptchaModule;

  constructor() {
    this.geetestCompleteCaptchaModule = new GeetestCompleteCaptchaModule();
  }

  async geetestCompleteCaptcha(
    input: GeetestCompleteCaptchaInput
  ): GeetestCompleteCaptchaOutput {
    try {
      const {
        page,
        captchaContainerSelector,
        verificationStatusSelector,
      } = input;

      const cursor = createCursor(page);

      await cursor.move(captchaContainerSelector);
      await cursor.click();

      let verificationStatus: GeetestVerificationStatus = "verifying";

      while (verificationStatus === "verifying") {
        const verificationStatusElement = await page.$(
          verificationStatusSelector
        );
        const verificationStatusText = await getAttribute(
          page,
          verificationStatusElement,
          "aria-label"
        );

        if (verificationStatusText === "Verification Success")
          verificationStatus = "success";

        if (verificationStatusText === "Incomplete")
          verificationStatus = "incomplete";

        if (verificationStatusText === "Error") verificationStatus = "error";

        await delay(1000);
      }

      if (verificationStatus === "incomplete") {
        const images = await this.geetestCompleteCaptchaModule.getCaptchaImages(
          {
            page,
          }
        );
        if (!images) {
          // TODO [error]
          return false;
        }

        const diffImage = await this.geetestCompleteCaptchaModule.getDiffImage({
          images,
        });

        const center = await this.geetestCompleteCaptchaModule.getPuzzlePieceSlotCenterPosition(
          diffImage
        );

        const isCompleted = await this.geetestCompleteCaptchaModule.slidePuzzlePiece(
          { page, center }
        );
        if (!isCompleted) {
          // TODO [error]
          return false;
        }
      }

      if (verificationStatus === "error") return false;

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
