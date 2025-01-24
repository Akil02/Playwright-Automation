const { test, expect } = require("@playwright/test");

let ElementButton = "Elements";
let AlertsButton = "Alerts, Frame & Windows";
let WidgetButton = "Widgets";
let InteractionsButton = "Interactions";
let F_Page = "Forms";

class HomePage {
  constructor(page) {
    this.page = page;
  }

  async Elements() {
    return await this.page.getByText(ElementButton);
  }

  async Forms() {
    await this.page.getByText(F_Page).click();
  }
  async Alerts_Frame_WindowsBut() {
    await this.page.getByText(AlertsButton).click();
  }

  async Widget() {
    await this.page.getByText(WidgetButton).click();
  }

  async Interaction() {
    await this.page.getByText(InteractionsButton).click();
  }
}
module.exports = HomePage;
