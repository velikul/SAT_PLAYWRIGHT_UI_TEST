import { When, Then, Given } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getPage } from "./hooks";

let startTime: number;;

  Then('clicks on setup save confirm button', async function () {
    await this.setupPage.lockLabelConfirmButton.click();
    startTime = Date.now();
  })

  Then('clicks on Annotate navigation menu button', async function ()  {

    getPage().setDefaultTimeout(300000);
    await getPage().waitForFunction(() => {
        const button = document.querySelector('#navbar-annotate');
        return button && !button.hasAttribute('aria-disabled');
    }, { timeout: 600000, polling: 1000  }); // Wait up to 10 minutes
    
    // Click the button once it's enabled
    await getPage().locator('#navbar-annotate').click();
    const elapsedTimeMs = Date.now() - startTime;
    const minutes = Math.floor(elapsedTimeMs / 60000);
    const seconds = ((elapsedTimeMs % 60000) / 1000).toFixed(3);
    console.log(`time: ${minutes}m${seconds}s`);
  });

