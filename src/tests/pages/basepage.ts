import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import { Page, Locator } from "playwright";

export default class BasePage {
  protected page: Page;
  protected log: ICreateAttachment;

  constructor(page: Page, log: ICreateAttachment) {
    this.page = page;
    this.log = log;
  }

  async click(locator: Locator) {
    await locator.click();
    console.log(`Clicked on ${locator}`);
  }

  async enterText(locator: Locator, data: string) {
    await locator.fill(data);
    console.log(`${data} is entered to ${locator}`);
  }

  getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
