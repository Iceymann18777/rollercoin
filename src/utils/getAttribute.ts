import { ElementHandle, Page } from "puppeteer";

export default async function(
  page: Page,
  element: ElementHandle,
  attribute: string
): Promise<any> {
  try {
    const getAttribute = await page.evaluate(
      (el: any, attribute: any) => {
        return el.getAttribute(attribute);
      },
      await element,
      attribute
    );

    return getAttribute;
  } catch (error) {
    console.log(error);
    return false;
  }
}
