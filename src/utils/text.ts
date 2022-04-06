import { Page, ElementHandle } from "puppeteer";

export default async function(
  page: Page,
  element: ElementHandle
): Promise<string | false> {
  try {
    const textContent = await page.evaluate(
      (el: any) => el.textContent,
      await element
    );

    return textContent.replace(/[\n\r\t]/g, "").trim();
  } catch (error) {
    console.log(error);
    return false;
  }
}
