import { When, Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getPage } from "./hooks";

Then("unselects all behaviors", async function () {
  await this.setupPage.unselectAllButton.click();
});

Then("select the following behaviors", async function (behaviorsList) {
  const behaviors: string[] = behaviorsList.raw().flat();
  await this.setupPage.selectTheFollowingBehaviors(behaviors);
});


