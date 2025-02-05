import {
  setDefaultTimeout,
  BeforeAll,
  AfterAll,
  Before,
  After,
  Status,
} from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium, firefox } from "playwright";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

setDefaultTimeout(1000 * 2 * 60);

let browser: Browser;
let bCtx: BrowserContext;
let page: Page;

BeforeAll(async function () {
  dotenv.config({
    path: `${process.cwd()}/config/.env.${process.env.env ?? "tst"}`,
  });
  let browserType = process.env.browser ?? "chrome";

  switch (browserType) {
    case "chrome":
    case "gc":
      browser = await chromium.launch({
        headless: false,
        channel: "chrome",
        args: ["--start-maximized"],
      });
      break;
    case "firefox":
    case "ff":
      browser = await firefox.launch({
        headless: false,
        args: ["--start-maximized"],
      });
      break;
    case "edge":
    case "msedge":
      browser = await chromium.launch({
        headless: false,
        channel: "msedge",
        args: ["--start-maximized"],
      });
      break;
    default:
      throw new Error(
        `invalid browser type ${browserType} is passed..! pls correct it.`
      );
  }
});

Before(async function (scenario) {
  this.attach(
    `----------------- ${scenario.pickle.name} is started.............!`
  );
  bCtx = await browser.newContext({ viewport: null, javaScriptEnabled: true });
  page = await bCtx.newPage();
  const reportsDir = "./reports";

  if (fs.existsSync(reportsDir)) {
    fs.readdirSync(reportsDir).forEach((file) => {
      if (file.endsWith(".png")) {
        fs.unlinkSync(path.join(reportsDir, file));
      }
    });
  }
});

After(async function (scenario) {
  if (scenario.result?.status == Status.FAILED) {
    const img = await page.screenshot({
      path: `./reports/${scenario.pickle.name}.png`,
    });

    this.attach(img, "image/png");
  }
  await page.close();
  await bCtx.close();
});

AfterAll(async function () {
  await browser.close();
});

export function getPage(): Page {
  return page;
}
