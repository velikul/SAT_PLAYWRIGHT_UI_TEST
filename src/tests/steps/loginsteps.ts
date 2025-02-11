import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import assert from "assert";
import { getPage } from "./hooks";
import LoginPage from "../pages/loginpage";

let loginPage: LoginPage;

// Step to navigate to the login page
Given("the user is on the login page", async function () {
  loginPage = new LoginPage(getPage(), this.attach);
  await loginPage.gotoLoginPage();// Navigate to the login page
});

// Step to enter valid credentials
When("enters valid credentials", async function () {
  await loginPage.signInAsTester();// Perform login action
});

// Step to verify the user is logged in
Then("the user is logged in", async function () {
  await expect(getPage()).toHaveTitle("SmartAnnotator"); // Assert that the page title is "SmartAnnotator" after login
  this.attach(await getPage().title());
});

// Step to enter the invalid credentials
When("enters the invalid credentials {string} and {string}",
  async function (email, password) {
    loginPage.signIn(email, password);// Perform login action
  }
);

// Step to verify error messages
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

