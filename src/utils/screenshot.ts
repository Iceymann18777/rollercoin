import { Page, ScreenshotClip, ScreenshotOptions } from "puppeteer";
import { ScreenshotCompletedIn } from "src/data/debug.data";

export default async function(
  page: Page,
  type: ScreenshotOptions["type"],
  clip: ScreenshotClip,
  omitBackground: boolean = false,
  debug: boolean = false
): Promise<Buffer | string | false> {
  try {
    let beforeScreenshot: number | null = null;
    let afterScreenshot: number | null = null;

    if (debug) beforeScreenshot = Date.now();

    const screenshot = await page.screenshot({
      type,
      clip,
      omitBackground,
    });

    if (debug) afterScreenshot = Date.now();

    if (debug)
      console.log(
        `[debug] ${ScreenshotCompletedIn} ${afterScreenshot -
          beforeScreenshot} ms.`
      );

    return screenshot;
  } catch (error) {
    console.log(error);
    return false;
  }
}
