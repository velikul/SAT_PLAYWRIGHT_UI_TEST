var reporter = require("cucumber-html-reporter");
import * as dotenv from "dotenv";

var options = {
  theme: "bootstrap",
  jsonFile: "reports/cucumber_report.json",
  output: "reports/cucumber_report_bootstrap.html",
  brandTitle: "SAT PLAYWRIGHT TEST",
  name: "Smart Annotator",
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  screenshotDirectory: "reports/",
  metadata: {
    browser: "",
    url: "",
  },
  failedSummaryReport: true,
};

function generateHtml() {
  dotenv.config();
  options.metadata.browser = process.env.browser!;
  options.metadata.url = process.env.url!;
  reporter.generate(options);
}

generateHtml();
