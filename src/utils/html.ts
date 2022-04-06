import { Page, ElementHandle } from "puppeteer";

export default async function(
  page: Page,
  element: ElementHandle
): Promise<string | false> {
  try {
    const innerHTML = await page.evaluate(
      (el: any) => el.innerHTML,
      element
    );

    return innerHTML.replace(/[\n\r\t]/g, "").trim();
  } catch (error) {
    console.log(error);
    return false;
  }
}
