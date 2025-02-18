import { When, Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getPage } from "./hooks";

Then("clicks on create experiment button", async function () {
  await this.createExperimentPage.createExperimentButton.click();
});

Then("types a unique name and a unique description", async function () {
  await this.createExperimentPage.writeUniqueNameAndDescription();
});

Then("clicks on create experiment submit button", async function () {
  await this.createExperimentPage.submitButton.click();
});

Then("clicks on skip upload button", async function () {
  await this.createExperimentPage.skipUploadButton.click();
});

Then("sees the first name as the unique experiment name", async function () {
  await expect(this.homePage.firstExpName).toHaveText(this.createExperimentPage.uniqueName);
});

Then("sees the first name as {string}", async function (name: string) {
  await expect(this.homePage.firstExpName).toHaveText(name);
});

Then("delete the unique name experiment", async function () {
  await this.homePage.deleteExperimentWithName(this.createExperimentPage.uniqueName);
});

Then(
  "deletes the experiment with name {string}",
  async function (name: string) {
    await this.homePage.deleteExperimentWithName(name);
  }
);

Then(
  "sees the create experiment page header as {string}",
  async function (expectedTitle: string) {
    const actualTitle =
      await this.createExperimentPage.createExperimentPageTitle.textContent();
    expect(actualTitle).toBe(expectedTitle);
  }
);

Then("name and description are enabled", async function () {
  expect(await this.createExperimentPage.experimentNameInput.isEnabled());
  expect(
    await this.createExperimentPage.experimentDescriptionInput.isEnabled()
  );
});

Then(
  /^create experiment submit button (is|is not) enabled$/,
  async function (isOrIsNot: string) {
    const expectedState = isOrIsNot === "is";
    const actualState =
      await this.createExperimentPage.submitButton.isEnabled();
    expect(actualState).toBe(expectedState);
  }
);

When("types {string} as name", async function (expName: string) {
  await this.createExperimentPage.experimentNameInput.fill(expName);
});

When("deletes name", async function () {
  await this.createExperimentPage.experimentNameInput.click();
  await this.createExperimentPage.experimentNameInput.press("Control+A");
  await this.createExperimentPage.experimentNameInput.press("Delete");
});

Then("sees {string} text on the page", async function (textOnThePage: string) {
  await this.createExperimentPage.verifyDisplayElementWithText(textOnThePage);
});

Then("closes the create experiment page", async function () {
  await this.createExperimentPage.closeButton.click();
});

Then("waits for the experiment list to load", async function () {
  await this.homePage.waitForExperimentListToLoad();
});

Given('the user creates experiment with a unique name', async function () {
  await this.createExperimentPage.createExperimentButton.click();
  await this.createExperimentPage.writeUniqueNameAndDescription();
  await this.createExperimentPage.submitButton.click();
  await this.createExperimentPage.skipUploadButton.click();
  await expect(this.homePage.firstExpName).toHaveText(this.createExperimentPage.uniqueName);
})

Given('clicks on upload completed close button', async function () {
  await this.homePage.submitUploadButton.click();
})

Given('selects the first experiment', async function () {
  await this.homePage.firstExpName.click();
  await getPage().pause();
})

Then('clicks on upload data icon', async function ()  {
  await this.detailsPage.dataUploadIcon.click();
})

Then('upload one minute experiment', async function () {
  
})
