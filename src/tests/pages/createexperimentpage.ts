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
  public uniqueName: string;
  public uniqueDescription: string;
  public fileUploadArea: Locator;
  public submitUploadButton: Locator;

  constructor(page: Page, log: ICreateAttachment) {
    super(page, log);
    this.createExperimentButton = page.locator(
      "#experiment-create-button-ethovision"
    );
    this.experimentNameInput = page.locator("#name-input");
    this.experimentDescriptionInput = page.locator("#description-input");
    this.submitButton = page.locator("#submit-button");
    this.skipUploadButton = page.locator("#skip-upload-button");
    this.createExperimentPageTitle = page.locator("#modal-modal-title");
    this.closeButton = page.locator("//*[@data-testid='CancelOutlinedIcon']");
    this.uniqueName = "";
    this.uniqueDescription = "";
    this.fileUploadArea = page.locator("#dropzone-input");
    this.submitUploadButton = page.locator("#submit-upload-button");
  }

  async verifyDisplayElementWithText(expName: string) {
    await expect(this.getElementWithText(expName)).toBeVisible();
  }

  async writeUniqueNameAndDescription() {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    const timestamp = now.toISOString().replace(/[:.]/g, "-");

    this.uniqueName = `Experiment_${timestamp}`;
    this.uniqueDescription = `This is a test experiment created at ${timestamp}`;

    await this.experimentNameInput.fill(this.uniqueName);
    await this.experimentDescriptionInput.fill(this.uniqueDescription);
  }
}
