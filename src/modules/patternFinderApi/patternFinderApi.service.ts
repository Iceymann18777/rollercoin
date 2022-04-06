import fetch from "node-fetch";
import { FindPatternWithinImageInput } from "./dto/findPatternWithinImage.input";
import { FindPatternWithinImageOutput } from "./dto/findPatternWithinImage.output";
import { GetScreenshotAndSaveImageInput } from "./dto/getScreenshotAndSaveImage.input";
import { GetScreenshotAndSaveImageOutput } from "./dto/getScreenshotAndSaveImage.output";
import { SaveImageInput } from "./dto/saveImage.input";
import { SaveImageOutput } from "./dto/saveImage.output";
import { FindPatternWithinImageResponseData } from "./types/findPatternWithinImage.types";

export class PatternFinderApiService {
  async findPatternWithinImage(
    input: FindPatternWithinImageInput
  ): FindPatternWithinImageOutput {
    try {
      const body = {
        pattern: input.pattern.toString("base64"),
        findWithin: input.findWithin.toString("base64"),
      };

      const response = await fetch(
        `${process.env.patternFinderUrl}/findPatternWithinImage`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data: FindPatternWithinImageResponseData = await response.json();
      const foundPatterns = data.foundPatterns;

      return foundPatterns;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async saveImage(input: SaveImageInput): SaveImageOutput {
    try {
      const body = {
        image: input.image.toString("base64"),
        name: input.name,
      };

      await fetch(`${process.env.patternFinderUrl}/saveImage`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getScreenshotAndSaveImage(
    input: GetScreenshotAndSaveImageInput
  ): GetScreenshotAndSaveImageOutput {
    try {
      const page = input.page;
      const name = input.name;

      const viewport = page.viewport();

      const screenshot = await page.screenshot({
        type: "png",
        clip: {
          x: 0,
          y: 0,
          width: viewport.width,
          height: viewport.height,
        },
        omitBackground: true,
      });

      const imageSaved = await this.saveImage({
        image: screenshot.toString("base64"),
        name,
      });

      return imageSaved ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
