import { Page, Locator } from "playwright";
import BasePage from "./basepage";
import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class SetupPage extends BasePage {
  public unselectAllButton: Locator;
  public selectAllButton: Locator;
  public lockLabelConfirmButton: Locator;

  constructor(page: Page, log: ICreateAttachment) {
    super(page, log);
    this.unselectAllButton = page.locator(
      "//*[@aria-label='Unselect all rows']/.."
    );
    this.selectAllButton = page.locator(
      "//*[@aria-label='Select all rows']/.."
    );
    this.lockLabelConfirmButton = page.locator(
      "#lock-label-confirm"
    );
  }

  selectBehavior(behaviorName: string): Locator {
    return this.page.locator(
      `//div[normalize-space()='${behaviorName}']/..//span/input`
    );
  }

  async selectTheFollowingBehaviors(
    selectedBehaviors: string[]
  ): Promise<void> {
    for (const behavior of selectedBehaviors) {
      await this.selectBehavior(behavior).click();
      await this.page.waitForTimeout(500);
    }
  }
}
