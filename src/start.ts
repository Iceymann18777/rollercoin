import { Viewport } from "puppeteer";
import puppeteer from "puppeteer-extra";
import "dotenv/config";
import { PlayGameScreenModule } from "modules/api/screens/playGameScreen/playGameScreen.module";
import { WindowApiModule } from "modules/windowApi/windowApi.module";
import { PatternFinderApiModule } from "modules/patternFinderApi/patternFinderApi.module";

class Start {
  // ? config
  private url: string;
  private viewport: Viewport;

  // ? modules
  private playGameScreenModule: PlayGameScreenModule;
  private windowApiModule: WindowApiModule;
  private patternFinderApiModule: PatternFinderApiModule;

  constructor() {
    // ? config
    this.url = "http://127.0.0.1:21222";
    this.viewport = {
      width: 1600,
      height: 900,
    };

    // ? modules
    this.playGameScreenModule = new PlayGameScreenModule();
    this.windowApiModule = new WindowApiModule();
    this.patternFinderApiModule = new PatternFinderApiModule();
  }

  async run(): Promise<boolean> {
    try {
      const browser = await puppeteer.connect({
        browserURL: this.url,
        defaultViewport: this.viewport,
      });
      const pages = await browser.pages();
      const page = pages[0];

      await this.windowApiModule.installMouseHelper({
        page,
      });

      await this.playGameScreenModule.startBot({
        page,
        game: "CoinFlip",
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

(async () => {
  const start = new Start();

  await start.run();
})();
