import { Page } from "puppeteer";
import { random } from "./random";

const fillField = async (
  page: Page,
  selector: string,
  text: string
): Promise<boolean> => {
  const delaysMinMax = [55, 155];

  try {
    for (const character of text) {
      const randomDelay = random(delaysMinMax[0], delaysMinMax[1]);

      await page.type(selector, character, {
        delay: randomDelay,
      });
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default fillField;
