import { Page, Locator } from "playwright";
import BasePage from "./basepage";
import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";
import { expect } from "playwright/test";

export default class CreateExperimentPage extends BasePage {
  public createExperimentButton: Locator;
  public experimentNameInput: Locator;
  public experimentDescriptionInput: Locator;
  public submitButton: Locator;
  public skipUploadButton: Locator;
  public createExperimentPageTitle: Locator;
  public closeButton: Locator;

  constructor(page: Page, log: ICreateAttachment) {
    super(page, log);
    this.createExperimentButton = page.locator("#experiment-create-button-ethovision");
    this.experimentNameInput = page.locator("#name-input");
    this.experimentDescriptionInput = page.locator("#description-input");
    this.submitButton = page.locator("#submit-button");
    this.skipUploadButton = page.locator("#skip-upload-button");
    this.createExperimentPageTitle = page.locator("#modal-modal-title");
    this.closeButton = page.locator("//*[@data-testid='CancelOutlinedIcon']");
  }

  async verifyDisplayElementWithText(expName: string) {
    await expect(this.getElementWithText(expName)).toBeVisible();
  }
}
