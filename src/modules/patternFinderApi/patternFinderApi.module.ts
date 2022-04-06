import { FindPatternWithinImageInput } from "./dto/findPatternWithinImage.input";
import { FindPatternWithinImageOutput } from "./dto/findPatternWithinImage.output";
import { GetScreenshotAndSaveImageInput } from "./dto/getScreenshotAndSaveImage.input";
import { GetScreenshotAndSaveImageOutput } from "./dto/getScreenshotAndSaveImage.output";
import { SaveImageInput } from "./dto/saveImage.input";
import { SaveImageOutput } from "./dto/saveImage.output";
import { PatternFinderApiService } from "./patternFinderApi.service";

export class PatternFinderApiModule {
  private patternFinderApiService: PatternFinderApiService;

  constructor() {
    this.patternFinderApiService = new PatternFinderApiService();
  }

  async findPatternWithinImage(
    findPatternWithinImageInput: FindPatternWithinImageInput
  ): FindPatternWithinImageOutput {
    return await this.patternFinderApiService.findPatternWithinImage(
      findPatternWithinImageInput
    );
  }

  async saveImage(saveImageInput: SaveImageInput): SaveImageOutput {
    return await this.patternFinderApiService.saveImage(saveImageInput);
  }

  async getScreenshotAndSaveImage(
    getScreenshotAndSaveImageInput: GetScreenshotAndSaveImageInput
  ): GetScreenshotAndSaveImageOutput {
    return await this.patternFinderApiService.getScreenshotAndSaveImage(
      getScreenshotAndSaveImageInput
    );
  }
}
