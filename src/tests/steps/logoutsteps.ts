import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect, Page } from "@playwright/test";
import { getPage } from "./hooks";
import HomePage from "../pages/homepage";
import LoginPage from "../pages/loginpage";

let homePage: HomePage;
let loginPage: LoginPage;
let newPage: Page;

// Step to navigate to the login page and sign in as a tester
Given("the user is on the home page", async function () {
  loginPage = new LoginPage(getPage(), this.attach);
  await loginPage.gotoLoginPage(); // Navigate to the login page
  await loginPage.signInAsTester(); // Perform login action
});

// Step to click on the account button
Given("clicks on the account button", async function () {
  homePage = new HomePage(getPage(), this.attach);
  await homePage.accountButton.click();
});

// Step to click on the logout button
When("clicks on the logout button", async function () {
  await homePage.logoutButton.click();
});

// Step to verify the user is logged out
Then("is logged out", async function () {
    loginPage = new LoginPage(getPage(), this.attach);
    expect(await loginPage.usernameInput.isVisible()); 
});

// Step to click on the contact support button
When("clicks on contact support button", async function () {
    await homePage.contactSupportButton.click(); // Click on the contact support button
});

// Step to verify a new window is opened
Then("a new window is opened", async function () {
  const context = getPage().context(); 
  newPage = await context.waitForEvent("page"); // Wait for the new page to be opened
  await newPage.waitForLoadState(); // Ensure the page is fully loaded
  await newPage.bringToFront(); // Bring the new page to the front
});

// Step to verify the title of the newly opened window
Then("can see the title {string}", async function (expectedTitle) {
  await expect(newPage).toHaveTitle(expectedTitle); // Check if the new page has the expected title
});
