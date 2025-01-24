const { test, expect } = require("@playwright/test");
import HomePage from "../PageObjectModel/HomePage.spec";
import FormPage from "../PageObjectModel/Forms.spec";

test("Test case to check all functinality under Alerts,Frame and Windows", async ({
  page,
}) => {
  await page.goto("/");
  const home = new HomePage(page);
  await home.Forms();
  const form = new FormPage(page);
  await form.practiceFormButt();
  await form.FormDetails(
    "Female",
    "2008",
    "April",
    "5",
    "Maths",
    "Reading",
    "StreetCheck",
    "Uttar Pradesh",
    "Lucknow"
  );
});
