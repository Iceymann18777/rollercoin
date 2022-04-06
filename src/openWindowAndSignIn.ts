import { Viewport } from "puppeteer";
import { delay } from "utils/delay";
import { SignInScreenModule } from "modules/api/screens/signInScreen/signInScreen.module";
import { WindowApiModule } from "modules/windowApi/windowApi.module";

class OpenWindowAndSignIn {
  // ? config
  private url: string;
  private signInData: {
    email: string;
    password: string;
  };
  private userAgent: string;
  private remoteDebuggingPort: number;
  private headless: boolean;
  private ignoreDefaultArgs: string[];
  private args: string[];
  private viewport: Viewport;

  // ? modules
  private windowApiModule: WindowApiModule;
  private signInScreenModule: SignInScreenModule;

  constructor() {
    // ? config
    this.url = "https://rollercoin.com/game";
    this.signInData = {
      email: "mdruhulamincorporations@gmail.com",
      password: "Timeup1986",
    };
    this.userAgent =
      "Mozilla/5.0 (X11; Linux x86_64)" +
      "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
    this.remoteDebuggingPort = 21222;
    this.headless = false;
    this.ignoreDefaultArgs = ["--enable-automation"];
    this.args = [`--remote-debugging-port=${this.remoteDebuggingPort}`];
    this.viewport = {
      width: 1600,
      height: 900,
    };

    // ? modules
    this.windowApiModule = new WindowApiModule();
    this.signInScreenModule = new SignInScreenModule();
  }

  async run(): Promise<boolean> {
    try {
      const page = await this.windowApiModule.openWindow({
        headless: this.headless,
        ignoreDefaultArgs: this.ignoreDefaultArgs,
        args: this.args,
        userAgent: this.userAgent,
        viewport: this.viewport,
      });
      if (!page) {
        // TODO [error]
        return false;
      }

      await this.windowApiModule.prepareWindow({
        page,
        userAgent: this.userAgent,
        viewport: this.viewport,
      });

      await page.setViewport(this.viewport);

      await page.goto(this.url);

      await delay(5000);

      await this.signInScreenModule.signIn({
        page,
        ...this.signInData,
      });

      await delay(300000000);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

(async () => {
  const openWindowAndSignIn = new OpenWindowAndSignIn();

  await openWindowAndSignIn.run();
})();
