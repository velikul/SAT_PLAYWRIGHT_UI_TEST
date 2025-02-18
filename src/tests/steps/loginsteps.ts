import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import assert from "assert";
import { getPage } from "./hooks";

// Step to navigate to the login page
Given("the user is on the login page", async function () {
  await this.loginPage.gotoLoginPage();// Navigate to the login page
});

// Step to enter valid credentials
When("enters valid credentials", async function () {
  await this.loginPage.signInAsTester();// Perform login action
});

// Step to verify the user is logged in
Then("the user is logged in", async function () {
  await expect(getPage()).toHaveTitle("SmartAnnotator"); // Assert that the page title is "SmartAnnotator" after login
  this.attach(await getPage().title());
});

// Step to enter the invalid credentials
When("enters the invalid credentials {string} and {string}",
  async function (email, password) {
    this.loginPage.signIn(email, password);// Perform login action
  }
);

// Step to verify error messages
Then("{string} message is displayed", async function (errorMessage) {
  switch (errorMessage) {
    case "Please enter your Email Address":
    case "Please enter a valid email address.":
      await expect(this.loginPage.emailError).toHaveText(errorMessage);
      console.log(await this.loginPage.emailError.textContent());
      break;
    case "Please enter your password":
      await expect(this.loginPage.passwordError).toHaveText(errorMessage);
      console.log(await this.loginPage.passwordError.textContent());
      break;
    case "Your password is incorrect.":
      await expect(getPage().locator(".pageLevel")).toHaveText(errorMessage);
      console.log(await this.loginPage.pageLevelError.textContent());
      break;
    case "We can't seem to find your account.":
      await expect(await this.loginPage.pageLevelError).toHaveText(errorMessage);
      const actualMessage = await this.loginPage.pageLevelError.textContent();
      console.log(`Expected: "${errorMessage}", Actual: "${actualMessage}"`);
      break;
    default:
      assert.fail("Unknown error message: " + errorMessage);
  }
});

