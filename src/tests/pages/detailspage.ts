import { Page, Locator } from "playwright";
import BasePage from "./basepage";
import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";


export default class DetailsPage extends BasePage {
  public dataUploadIcon: Locator;
  public fileUploadArea: Locator;

  constructor(page: Page, log: ICreateAttachment) {
    super(page, log);
    this.dataUploadIcon = page.locator("//*[@data-testid='CloudUploadOutlinedIcon']");
    this.fileUploadArea = page.locator("#dropzone-input");

  }
}
