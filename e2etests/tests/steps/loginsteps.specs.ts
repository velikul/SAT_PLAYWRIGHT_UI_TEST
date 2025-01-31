import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import assert from "assert";
import { getPage } from "../../corelib/corelib.specs";
import LoginPage from "../pages/loginpage";

let loginPage: LoginPage;

Given("the user is on the login page", async function () {
  loginPage = new LoginPage(getPage(),this.attach);
  await loginPage.gotoLoginPage();
});

When("enters valid credentials", async function () {
  await loginPage.loginToApp();
});

Then("the user is logged in", async function () {
  await expect(getPage()).toHaveTitle("SmartAnnotator");
  this.attach(await getPage().title());
});

When(
  "enters the invalid credentials {string} and {string}",
  async function (email, password) {
    loginPage.enterText(loginPage.usernameInput, email);
    loginPage.enterText(loginPage.passwordInput, password);
    await loginPage.signInButton.click();
  }
);

Then("{string} message is displayed", async function (errorMessage) {
  switch (errorMessage) {
    case "Please enter your Email Address":
    case "Please enter a valid email address.":
      await expect(loginPage.emailError).toHaveText(errorMessage);
      console.log(await loginPage.emailError.textContent());
      break;
    case "Please enter your password":
      await expect(loginPage.passwordError).toHaveText(errorMessage);
      console.log(await loginPage.passwordError.textContent());
      break;
    case "Your password is incorrect.":
      await expect(getPage().locator(".pageLevel")).toHaveText(errorMessage);
      console.log(await loginPage.pageLevelError.textContent());
      break;
    case "We can't seem to find your account.":
      await expect(await loginPage.pageLevelError).toHaveText(errorMessage);
      const actualMessage = await loginPage.pageLevelError.textContent();
      console.log(`Expected: "${errorMessage}", Actual: "${actualMessage}"`);
      break;
    default:
      assert.fail("Unknown error message: " + errorMessage);
  }
});
