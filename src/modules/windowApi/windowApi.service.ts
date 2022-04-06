import puppeteer from "puppeteer-extra";
import { CloseEmptyPagesInput } from "./dto/closeEmptyPages.input";
import { CloseEmptyPagesOutput } from "./dto/closeEmptyPages.output";
import { InstallMouseHelperInput } from "./dto/installMouseHelper.input";
import { InstallMouseHelperOutput } from "./dto/installMouseHelper.output";
import { OpenWindowInput } from "./dto/openWindow.input";
import { OpenWindowOutput } from "./dto/openWindow.output";
import { PrepareWindowInput } from "./dto/prepareWindow.input";
import { PrepareWindowOutput } from "./dto/prepareWindow.output";

export class WindowApiService {
  async openWindow(input: OpenWindowInput): OpenWindowOutput {
    try {
      const StealthPlugin = require("puppeteer-extra-plugin-stealth");
      puppeteer.use(StealthPlugin());

      const browser = await puppeteer.launch({
        headless: input.headless,
        ignoreDefaultArgs: input.ignoreDefaultArgs,
        args: input.args,
      });

      const page = await browser.newPage();

      return page;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async installMouseHelper(
    input: InstallMouseHelperInput
  ): InstallMouseHelperOutput {
    try {
      const page = input.page;

      await page.evaluateOnNewDocument(() => {
        // Install mouse helper only for top-level frame.
        if (window !== window.parent) return;
        window.addEventListener(
          "DOMContentLoaded",
          () => {
            const box = document.createElement("puppeteer-mouse-pointer");
            const styleElement = document.createElement("style");
            styleElement.innerHTML = `
            puppeteer-mouse-pointer {
              pointer-events: none;
              position: absolute;
              top: 0;
              z-index: 10000;
              left: 0;
              width: 20px;
              height: 20px;
              background: rgba(255,255,255,0.3);
              border-radius: 10px;
              margin: -10px 0 0 -10px;
              padding: 0;
              transition: background .2s, border-radius .2s, border-color .2s;
            }
            puppeteer-mouse-pointer.button-1 {
              transition: none;
              background: rgba(0,0,0,0.9);
            }
            puppeteer-mouse-pointer.button-2 {
              transition: none;
              border-color: rgba(0,0,255,0.9);
            }
            puppeteer-mouse-pointer.button-3 {
              transition: none;
              border-radius: 4px;
            }
            puppeteer-mouse-pointer.button-4 {
              transition: none;
              border-color: rgba(255,0,0,0.9);
            }
            puppeteer-mouse-pointer.button-5 {
              transition: none;
              border-color: rgba(0,255,0,0.9);
            }
          `;
            document.head.appendChild(styleElement);
            document.body.appendChild(box);
            document.addEventListener(
              "mousemove",
              (event) => {
                box.style.left = event.pageX + "px";
                box.style.top = event.pageY + "px";
                updateButtons(event.buttons);
              },
              true
            );
            document.addEventListener(
              "mousedown",
              (event) => {
                updateButtons(event.buttons);
                box.classList.add("button-" + event.which);
              },
              true
            );
            document.addEventListener(
              "mouseup",
              (event) => {
                updateButtons(event.buttons);
                box.classList.remove("button-" + event.which);
              },
              true
            );
            function updateButtons(buttons: any) {
              for (let i = 0; i < 5; i++) {
                box.classList.toggle(
                  "button-" + i,
                  buttons & (1 << i) ? true : false
                );
              }
            }
          },
          false
        );
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async prepareWindow(input: PrepareWindowInput): PrepareWindowOutput {
    const { page, userAgent, viewport } = input;

    try {
      // Pass the User-Agent Test.
      await page.setUserAgent(userAgent);

      await page.setViewport(viewport);

      // Pass the Webdriver Test.
      // console.log(page);
      await page.evaluateOnNewDocument(() => {
        // @ts-ignore
        Object.defineProperty(navigator, "webdriver", {
          get: () => undefined,
        });
      });

      // Pass the Chrome Test.
      await page.evaluateOnNewDocument(() => {
        // We can mock this in as much depth as we need for the test.
        // @ts-ignore
        window.navigator.chrome = {
          runtime: {},
          // etc.
        };
      });

      // Pass the Permissions Test.
      // await page.evaluateOnNewDocument(() => {
      //   const originalQuery = window.navigator.permissions.query;
      //   return window.navigator.permissions.query = (parameters) => (
      //     parameters.name === 'notifications' ?
      //       Promise.resolve({ state: Notification.permission }) :
      //       originalQuery(parameters)
      //   );
      // });

      // Pass the Plugins Length Test.
      await page.evaluateOnNewDocument(() => {
        // Overwrite the `plugins` property to use a custom getter.
        // @ts-ignore
        Object.defineProperty(navigator, "plugins", {
          // This just needs to have `length > 0` for the current test,
          // but we could mock the plugins too if necessary.
          get: () => [1, 2, 3, 4, 5],
        });
      });

      // Pass the Languages Test.
      await page.evaluateOnNewDocument(() => {
        // Overwrite the `plugins` property to use a custom getter.
        // @ts-ignore
        Object.defineProperty(navigator, "languages", {
          get: () => ["en-US", "en"],
        });
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async closeEmptyPages(input: CloseEmptyPagesInput): CloseEmptyPagesOutput {
    const emptyPages = ["about:blank", "chrome://new-tab-page/"];

    try {
      const pages = input.pages;

      for (const page of pages) {
        const url = page.url();

        if (emptyPages.includes(url)) {
          await page.close();
        }
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
