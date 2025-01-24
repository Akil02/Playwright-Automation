const { test, expect } = require("@playwright/test");
import HomePage from "../PageObjectModel/HomePage.spec";
import Alert from "../PageObjectModel/Alerts_Frame_Windows.spec";

test("Test case to check all functinality under Alerts,Frame and Windows", async ({
  page,
}) => {
  await page.goto("/");
  const home = new HomePage(page);
  await home.Alerts_Frame_WindowsBut();
  const AlertPage = new Alert(page);
  await AlertPage.Browser();
  await AlertPage.BrowserWindows();
  await AlertPage.AlertsBut();
  await AlertPage.AlertsCheck();
  await AlertPage.FrameButton();
  await AlertPage.IframesCheck();
});
