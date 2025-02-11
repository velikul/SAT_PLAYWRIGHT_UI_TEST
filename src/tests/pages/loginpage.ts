import { Page, Locator } from "playwright";
import BasePage from "./basepage";
import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class LoginPage extends BasePage {
  public rccConfirmButton: Locator;
  public usernameInput: Locator;
  public passwordInput: Locator;
  public signInButton: Locator;
  public emailError: Locator;
  public passwordError: Locator;
  public pageLevelError: Locator;

  constructor(page: Page, log:ICreateAttachment) {
    super(page,log);
    this.rccConfirmButton = page.locator("#rcc-confirm-button");
    this.usernameInput = page.locator("#email");
    this.passwordInput = page.locator("#password");
    this.signInButton = page.locator("#next");
    this.emailError = page.locator(
      "div[class='entry-item'] div[role='alert'] p"
    );
    this.passwordError = page.locator("p[role='alert']");
    this.pageLevelError = page.locator(".pageLevel");
  }

  async gotoLoginPage() {
    await this.page.goto(process.env.app_url!);
  }

  async signInAsTester() {
    await this.enterText(this.usernameInput, process.env.user_name!);
    await this.enterText(this.passwordInput, process.env.password!);
    await this.click(this.signInButton);
  }
  
  async signIn(email: string, password: string) {
    await this.enterText(this.usernameInput, email);
    await this.enterText(this.passwordInput, password);
    await this.signInButton.click();
  }
}
