require("dotenv").config();
const fs = require("fs");
const { test } = require("@playwright/test");
const { type } = require("os");
import Register from "../PageObjectModel/Register.spec";

const fixture = test.extend({
  // Define your fixture (e.g., a logged-in page)
  Page: async ({ page }, use) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");
    if (!process.env.TEST_USERNAME) {
      await page.getByText("Register").click();
      const register = new Register(page);
      let value = await register.NewRegister();
      await page.locator("input[name = 'username']").fill(value[0]);
      await page.locator("input[name = 'password']").fill(value[1]);
      const envContent = `TEST_USERNAME=${value[0]}\nTEST_PASSWORD=${value[1]}`;
      fs.writeFileSync(".env", envContent);
    } else {
      await page
        .locator("input[name = 'username']")
        .fill(process.env.TEST_USERNAME);
      await page
        .locator("input[name = 'password']")
        .fill(process.env.TEST_PASSWORD);
    }
    await await use(page);
  },
});
export const test1 = fixture;
