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
const Jimp = require("jimp");
const pixelmatch = require("pixelmatch");
const { cv } = require("opencv-wasm");

export class GeetestCompleteCaptchaService {
  constructor() {}

  async getCaptchaImages(input: GetCaptchaImagesInput): GetCaptchaImagesOutput {
    try {
      const { page } = input;

      const images = await page.$$eval(
        ".geetest_canvas_img canvas",
        (canvases) => {
          return canvases.map((canvas) => {
            // This will get the base64 image data from the
            // html canvas. The replace function simply strip
            // the "data:image" prefix.
            // !!!!!!!!!!
            // @ts-ignore
            return canvas.toDataURL().replace(/^data:image\/png;base64,/, "");
          });
        }
      );

      // For each base64 string create a Javascript buffer.
      const buffers = images.map((img) => new Buffer(img, "base64"));

      // And read each buffer into a Jimp image.
      return {
        captcha: await Jimp.read(buffers[0]),
        puzzle: await Jimp.read(buffers[1]),
        original: await Jimp.read(buffers[2]),
      };
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getDiffImage(input: GetDiffImageInput): GetDiffImageOutput {
    const { images } = input;
    const { width, height } = images.original.bitmap;

    // Use the pixelmatch package to create an image diff
    const diffImage = new Jimp(width, height);
    pixelmatch(
      images.original.bitmap.data,
      images.captcha.bitmap.data,
      diffImage.bitmap.data,
      width,
      height,
      { includeAA: true, threshold: 0.2 }
    );

    // Use opencv to make the diff result more clear
    const src = cv.matFromImageData(diffImage.bitmap);
    const dst = new cv.Mat();
    const kernel = cv.Mat.ones(5, 5, cv.CV_8UC1);
    const anchor = new cv.Point(-1, -1);
    cv.threshold(src, dst, 127, 255, cv.THRESH_BINARY);
    cv.erode(dst, dst, kernel, anchor, 1);
    cv.dilate(dst, dst, kernel, anchor, 1);

    return new Jimp({
      width: dst.cols,
      height: dst.rows,
      data: Buffer.from(dst.data),
    });
  }

  async getPuzzlePieceSlotCenterPosition(
    input: GetPuzzlePieceSlotCenterPositionInput
  ): GetPuzzlePieceSlotCenterPositionOutput {
    const { diffImage } = input;

    const src = cv.matFromImageData(diffImage.bitmap);
    const dst = new cv.Mat();

    cv.cvtColor(src, src, cv.COLOR_BGR2GRAY);
    cv.threshold(src, dst, 150, 255, cv.THRESH_BINARY_INV);

    // This will find the contours of the image.
    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    cv.findContours(
      dst,
      contours,
      hierarchy,
      cv.RETR_EXTERNAL,
      cv.CHAIN_APPROX_SIMPLE
    );

    // Next, extract the center position from these contours.
    const contour = contours.get(0);
    const moment = cv.moments(contour);
    const cx = Math.floor(moment.m10 / moment.m00);
    const cy = Math.floor(moment.m01 / moment.m00);

    // Just for fun, let's draw the contours and center on a new image.
    cv.cvtColor(dst, dst, cv.COLOR_GRAY2BGR);
    const red = new cv.Scalar(255, 0, 0);
    cv.drawContours(dst, contours, 0, red);
    cv.circle(dst, new cv.Point(cx, cy), 3, red);
    new Jimp({
      width: dst.cols,
      height: dst.rows,
      data: Buffer.from(dst.data),
    }).write("./contours.png");

    return {
      x: cx,
      y: cy,
    };
  }

  async slidePuzzlePiece(input: SlidePuzzlePieceInput): SlidePuzzlePieceOutput {
    try {
      const { page, center } = input;

      const sliderHandle = await page.$(".geetest_slider_button");
      const handle = await sliderHandle.boundingBox();

      let handleX = handle.x + handle.width / 2;
      let handleY = handle.y + handle.height / 2;

      await page.mouse.move(handleX, handleY, { steps: 25 });
      await page.mouse.down();

      await page.waitForTimeout(250);

      let destX = handleX + center.x;
      let destY = handleY + 32;
      await page.mouse.move(destX, handleY, { steps: 25 });
      await page.waitForTimeout(100);

      // find the location of my puzzle piece.
      const puzzlePos = await this.findMyPuzzlePiecePosition({ page });
      if (!puzzlePos) {
        // TODO [error]
        return false;
      }
      destX = destX + center.x - puzzlePos.x;
      await page.mouse.move(destX, destY, { steps: 5 });
      await page.mouse.up();

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async findMyPuzzlePiecePosition(
    input: FindMyPuzzlePiecePositionInput
  ): FindMyPuzzlePiecePositionOutput {
    try {
      const { page } = input;
      // Must call the getCaptchaImages again, because we have changed the
      // slider position (and therefore the image)
      const images = await this.getCaptchaImages({ page });
      if (!images) {
        // TODO [error]
        return false;
      }
      const srcPuzzleImage = images.puzzle;
      const srcPuzzle = cv.matFromImageData(srcPuzzleImage.bitmap);
      const dstPuzzle = new cv.Mat();

      cv.cvtColor(srcPuzzle, srcPuzzle, cv.COLOR_BGR2GRAY);
      cv.threshold(srcPuzzle, dstPuzzle, 127, 255, cv.THRESH_BINARY);

      const kernel = cv.Mat.ones(5, 5, cv.CV_8UC1);
      const anchor = new cv.Point(-1, -1);
      cv.dilate(dstPuzzle, dstPuzzle, kernel, anchor, 1);
      cv.erode(dstPuzzle, dstPuzzle, kernel, anchor, 1);

      const contours = new cv.MatVector();
      const hierarchy = new cv.Mat();
      cv.findContours(
        dstPuzzle,
        contours,
        hierarchy,
        cv.RETR_EXTERNAL,
        cv.CHAIN_APPROX_SIMPLE
      );

      const contour = contours.get(0);
      const moment = cv.moments(contour);

      return {
        x: Math.floor(moment.m10 / moment.m00),
        y: Math.floor(moment.m01 / moment.m00),
      };
    } catch (error) {
      // TODO [error]
      return false;
    }
  }
}
