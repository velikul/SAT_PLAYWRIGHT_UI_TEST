import { Page, Locator } from "playwright";
import BasePage from "./basepage";
import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class HomePage extends BasePage {
  public accountButton: Locator;
  public smartAnnotatorLogo: Locator;
  public logoutButton: Locator;
  public contactSupportButton: Locator;
  public settingsButton: Locator;

  constructor(page: Page, log: ICreateAttachment) {
    super(page, log);
    this.accountButton = page.locator("#account-overview-button");
    this.smartAnnotatorLogo = page.locator("#nav-logo");
    this.logoutButton = page.locator("//*[@data-testid= 'LogoutIcon']");
    this.contactSupportButton = page.locator("//*[@data-testid= 'ContactSupportOutlinedIcon']");
    this.settingsButton = page.locator("//*[@data-testid= 'SettingsOutlinedIcon']");
  }
}
