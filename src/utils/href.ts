import { ElementHandle, Page } from "puppeteer";

export default async function(
  page: Page,
  element: ElementHandle
): Promise<any> {
  try {
    const href = await page.evaluate(
      (el: any) => el.getAttribute("href"),
      await element
    );

    return href;
  } catch (error) {
    console.log(error);
    return false;
  }
}
