import { Page, Locator } from "playwright";
import BasePage from "./basepage";
import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class HomePage extends BasePage {
  public accountButton: Locator;
  public smartAnnotatorLogo: Locator;
  public logoutButton: Locator;
  public contactSupportButton: Locator;
  public settingsButton: Locator;
  public deleteConfirmButton: Locator;
  public firstExpName: Locator;
  public expNames: Locator;
  public submitUploadButton: Locator;
  public experimentListSelector: string = "//*[@id='experiment-list']";

  constructor(page: Page, log: ICreateAttachment) {
    super(page, log);
    this.accountButton = page.locator("#account-overview-button");
    this.smartAnnotatorLogo = page.locator("#nav-logo");
    this.logoutButton = page.locator("//*[@data-testid= 'LogoutIcon']");
    this.contactSupportButton = page.locator(
      "//*[@data-testid= 'ContactSupportOutlinedIcon']"
    );
    this.settingsButton = page.locator(
      "//*[@data-testid= 'SettingsOutlinedIcon']"
    );
    this.deleteConfirmButton = page.locator("(//*[@role='dialog']//button)[2]");
    this.firstExpName = page.locator("(//*[@id='experiment-list']//a)[1]");
    this.expNames = page.locator("//*[@id='experiment-list']//a");
    this.submitUploadButton = page.locator("#submit-upload-button")
  }

  getExperimentDeleteButton(expName: string): Locator {
    return this.page.locator(
      `//*[text()='${expName}']/../../..//button[@aria-label='Delete']`
    );
  }

  async getAllExpNames(): Promise<string[]> {
    return await this.expNames.allTextContents();
  }

  async deleteExperimentWithName(expectedName: string) {
    const allExpNames = await this.getAllExpNames();
    for (let expName of allExpNames) {
      if (expName === expectedName) {
        await this.getExperimentDeleteButton(expectedName).click();
        await this.deleteConfirmButton.click();
        return;
      }
    }
  }
  async waitForExperimentListToLoad(): Promise<void> {
    try {
      await this.page.waitForSelector(this.experimentListSelector, { state: 'visible', timeout: 5000 });
    } catch (error) {
      throw new Error('Experiment list cannot be loaded in expected time');
    }
  }
}
