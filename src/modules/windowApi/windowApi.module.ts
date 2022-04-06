import { CloseEmptyPagesInput } from "./dto/closeEmptyPages.input";
import { CloseEmptyPagesOutput } from "./dto/closeEmptyPages.output";
import { InstallMouseHelperInput } from "./dto/installMouseHelper.input";
import { InstallMouseHelperOutput } from "./dto/installMouseHelper.output";
import { OpenWindowInput } from "./dto/openWindow.input";
import { OpenWindowOutput } from "./dto/openWindow.output";
import { PrepareWindowInput } from "./dto/prepareWindow.input";
import { PrepareWindowOutput } from "./dto/prepareWindow.output";
import { WindowApiService } from "./windowApi.service";

export class WindowApiModule {
  private windowApiService: WindowApiService;

  constructor() {
    this.windowApiService = new WindowApiService();
  }

  async openWindow(openWindowInput: OpenWindowInput): OpenWindowOutput {
    return await this.windowApiService.openWindow(openWindowInput);
  }

  async installMouseHelper(
    installMouseHelperInput: InstallMouseHelperInput
  ): InstallMouseHelperOutput {
    return await this.windowApiService.installMouseHelper(
      installMouseHelperInput
    );
  }

  async prepareWindow(
    prepareWindowInput: PrepareWindowInput
  ): PrepareWindowOutput {
    return await this.windowApiService.prepareWindow(prepareWindowInput);
  }

  async closeEmptyPages(
    closeEmptyPagesInput: CloseEmptyPagesInput
  ): CloseEmptyPagesOutput {
    return await this.windowApiService.closeEmptyPages(closeEmptyPagesInput);
  }
}
