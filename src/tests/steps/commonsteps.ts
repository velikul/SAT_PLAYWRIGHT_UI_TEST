import { When, Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getPage } from "./hooks";

Then("clicks on {string} button", async function (buttonName: string) {
    await this.homePage.clickWithTextName(buttonName);
});

Then('pauses', async function () {
    await getPage().pause();
})

Then('clicks on cookies accept button', async function () {
  await this.homePage.cookiesConsentButton.click();
})

Then('clicks on upload completed box close button', async function () {
  await this.homePage.uploadCloseButton.click();
})
