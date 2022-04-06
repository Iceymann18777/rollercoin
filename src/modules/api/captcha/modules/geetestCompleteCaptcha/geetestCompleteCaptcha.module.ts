import { FindMyPuzzlePiecePositionInput } from "./dto/findMyPuzzlePiecePosition.input";
import { FindMyPuzzlePiecePositionOutput } from "./dto/findMyPuzzlePiecePosition.output";
import { GetCaptchaImagesInput } from "./dto/getCaptchaImages.input";
import { GetCaptchaImagesOutput } from "./dto/getCaptchaImages.output";
import { GetDiffImageInput } from "./dto/getDiffImageInput.input";
import { GetDiffImageOutput } from "./dto/getDiffImageInput.output";
import { GetPuzzlePieceSlotCenterPositionInput } from "./dto/getPuzzlePieceSlotCenterPosition.input";
import { GetPuzzlePieceSlotCenterPositionOutput } from "./dto/getPuzzlePieceSlotCenterPosition.output";
import { SlidePuzzlePieceInput } from "./dto/slidePuzzlePiece.input";
import { SlidePuzzlePieceOutput } from "./dto/slidePuzzlePiece.output";
import { GeetestCompleteCaptchaService } from "./geetestCompleteCaptcha.service";

export class GeetestCompleteCaptchaModule {
  private geetestCompleteCaptchaService: GeetestCompleteCaptchaService;

  constructor() {
    this.geetestCompleteCaptchaService = new GeetestCompleteCaptchaService();
  }

  async getCaptchaImages(
    getCaptchaImagesInput: GetCaptchaImagesInput
  ): GetCaptchaImagesOutput {
    return await this.geetestCompleteCaptchaService.getCaptchaImages(
      getCaptchaImagesInput
    );
  }

  async getDiffImage(getDiffImageInput: GetDiffImageInput): GetDiffImageOutput {
    return await this.geetestCompleteCaptchaService.getDiffImage(
      getDiffImageInput
    );
  }

  async slidePuzzlePiece(
    slidePuzzlePieceInput: SlidePuzzlePieceInput
  ): SlidePuzzlePieceOutput {
    return await this.geetestCompleteCaptchaService.slidePuzzlePiece(
      slidePuzzlePieceInput
    );
  }

  async getPuzzlePieceSlotCenterPosition(
    getPuzzlePieceSlotCenterPositionInput: GetPuzzlePieceSlotCenterPositionInput
  ): GetPuzzlePieceSlotCenterPositionOutput {
    return await this.geetestCompleteCaptchaService.getPuzzlePieceSlotCenterPosition(
      getPuzzlePieceSlotCenterPositionInput
    );
  }

  async findMyPuzzlePiecePosition(
    findMyPuzzlePiecePositionInput: FindMyPuzzlePiecePositionInput
  ): FindMyPuzzlePiecePositionOutput {
    return await this.geetestCompleteCaptchaService.findMyPuzzlePiecePosition(
      findMyPuzzlePiecePositionInput
    );
  }
}
