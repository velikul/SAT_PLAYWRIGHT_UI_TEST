import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getPage } from "./hooks";
import CreateExperimentPage from "../pages/createexperimentpage";
import HomePage from "../pages/homepage";

let createExperimentPage: CreateExperimentPage;
let uniqueName: string;
let uniqueDescription: string;
let homePage: HomePage;

Then("clicks on create experiment button", async function () {
  createExperimentPage = new CreateExperimentPage(getPage(), this.attach);
  await createExperimentPage.createExperimentButton.click();
});

Then("types a unique name and a unique description", async function () {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  const timestamp = now.toISOString().replace(/[:.]/g, "-");

  uniqueName = `Experiment_${timestamp}`;
  uniqueDescription = `This is a test experiment created at ${timestamp}`;

  await createExperimentPage.experimentNameInput.fill(uniqueName);
  await createExperimentPage.experimentDescriptionInput.fill(uniqueDescription);
});

Then("clicks on create experiment submit button", async function () {
  await createExperimentPage.submitButton.click();
});

Then("clicks on skip upload button", async function () {
  await createExperimentPage.skipUploadButton.click();
});

Then("sees the first name as the unique experiment name", async function () {
  homePage = new HomePage(getPage(), this.attach);
  await expect(homePage.firstExpName).toHaveText(uniqueName);
});

Then("sees the first name as {string}", async function (name: string) {
  homePage = new HomePage(getPage(), this.attach);
  await expect(homePage.firstExpName).toHaveText(name);
});


Then("delete the unique name experiment", async function () {
  await homePage.deleteExperimentWithName(uniqueName);
});

Then("deletes the experiment with name {string}", async function (name: string) {
  homePage = new HomePage(getPage(), this.attach);
  await homePage.deleteExperimentWithName(name);
});

  Then("sees the create experiment page header as {string}", async function (expectedTitle: string) {
      const actualTitle =
        await createExperimentPage.createExperimentPageTitle.textContent();
      expect(actualTitle).toBe(expectedTitle);
    }
  );

  Then("name and description are enabled", async function () {
    expect(await createExperimentPage.experimentNameInput.isEnabled());
    expect(await createExperimentPage.experimentDescriptionInput.isEnabled());
  });

  Then(/^create experiment submit button (is|is not) enabled$/, async function (isOrIsNot: string) {
      const expectedState = isOrIsNot === "is";
      const actualState = await createExperimentPage.submitButton.isEnabled();
      expect(actualState).toBe(expectedState);
    }
  );

  When("types {string} as name", async function (expName: string) {
    await createExperimentPage.experimentNameInput.fill(expName);
  });

  When("deletes name", async function () {
    await createExperimentPage.experimentNameInput.click();
    await createExperimentPage.experimentNameInput.press("Control+A");
    await createExperimentPage.experimentNameInput.press("Delete");
  });

  Then("sees {string} text on the page", async function (textOnThePage: string) {
      await createExperimentPage.verifyDisplayElementWithText(textOnThePage);
    }
  );

  Then("closes the create experiment page", async function () {
    await createExperimentPage.closeButton.click();
  });

  Then('waits for the experiment list to load', async function () {
    await homePage.waitForExperimentListToLoad();
  });

