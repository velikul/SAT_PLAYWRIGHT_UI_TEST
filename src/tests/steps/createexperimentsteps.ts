import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getPage } from "./hooks";

let uniqueName: string;
let uniqueDescription: string;

Then("clicks on create experiment button", async function () {
  await this.createExperimentPage.createExperimentButton.click();
});

Then("types a unique name and a unique description", async function () {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  const timestamp = now.toISOString().replace(/[:.]/g, "-");

  uniqueName = `Experiment_${timestamp}`;
  uniqueDescription = `This is a test experiment created at ${timestamp}`;

  await this.createExperimentPage.experimentNameInput.fill(uniqueName);
  await this.createExperimentPage.experimentDescriptionInput.fill(uniqueDescription);
});

Then("clicks on create experiment submit button", async function () {
  await this.createExperimentPage.submitButton.click();
});

Then("clicks on skip upload button", async function () {
  await this.createExperimentPage.skipUploadButton.click();
});

Then("sees the first name as the unique experiment name", async function () {
  await expect(this.homePage.firstExpName).toHaveText(uniqueName);
});

Then("sees the first name as {string}", async function (name: string) {
  await expect(this.homePage.firstExpName).toHaveText(name);
});


Then("delete the unique name experiment", async function () {
  await this.homePage.deleteExperimentWithName(uniqueName);
});

Then("deletes the experiment with name {string}", async function (name: string) {
  await this.homePage.deleteExperimentWithName(name);
});

  Then("sees the create experiment page header as {string}", async function (expectedTitle: string) {
      const actualTitle =
        await this.createExperimentPage.createExperimentPageTitle.textContent();
      expect(actualTitle).toBe(expectedTitle);
    }
  );

  Then("name and description are enabled", async function () {
    expect(await this.createExperimentPage.experimentNameInput.isEnabled());
    expect(await this.createExperimentPage.experimentDescriptionInput.isEnabled());
  });

  Then(/^create experiment submit button (is|is not) enabled$/, async function (isOrIsNot: string) {
      const expectedState = isOrIsNot === "is";
      const actualState = await this.createExperimentPage.submitButton.isEnabled();
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
    }
  );

  Then("closes the create experiment page", async function () {
    await this.createExperimentPage.closeButton.click();
  });

  Then('waits for the experiment list to load', async function () {
    await this.homePage.waitForExperimentListToLoad();
  });

