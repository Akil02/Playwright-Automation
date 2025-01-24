const { test, expect } = require("@playwright/test");

let BrowserBut =
  ".accordion > div:nth-child(3) > div > ul > li:nth-child(1) > span";
let FramesBut =
  ".accordion > div:nth-child(3) > div > ul > li:nth-child(3) > span";
let NewWindowBut = "#windowButton";
let HeadingMsg = "#sampleHeading";
let Alerts =
  ".accordion > div:nth-child(3) > div > ul > li:nth-child(2) > span";
let AlertClick1 = "#alertButton";
let AlertClick2 = "#timerAlertButton";
let AlertClick3 = "#confirmButton";
let AlertClick4 = "#promtButton";
let Frame1 = "#frame1";
let Frame1_Text = "#sampleHeading";
let ModelDialog = "Modal Dialogs";
let SmallModalBut = "#showSmallModal";
let closesmallModelBut = "#closeSmallModal";
let LargeModalBut = "#showLargeModal";
let closeLargeModelBut = "#closeLargeModal";

class Alerts_Frame_Windows {
  constructor(page) {
    this.page = page;
  }

  async Browser() {
    await this.page.locator(BrowserBut).click();
  }

  async AlertsBut() {
    await this.page.locator(Alerts).click();
  }

  async FrameButton() {
    await this.page.locator(FramesBut).click();
  }

  async ModelDialogBut() {
    await this.page.getByText(ModelDialog).click();
  }

  async BrowserWindows() {
    const [newWindow] = await Promise.all([
      this.page.context().waitForEvent("page"), // Wait for a new window (page)
      this.page.locator(NewWindowBut).click(), // Trigger the action that opens the new window
    ]);
    console.log(
      "New Browser text message : " +
        (await newWindow.locator(HeadingMsg).textContent())
    );
    await newWindow.close();
  }

  async AlertsCheck() {
    this.page.on("dialog", async (dialog) => {
      console.log(
        "Dialog message and type : " +
          (await dialog.message()) +
          "and : " +
          (await dialog.type())
      );
      if (dialog.type() === "prompt") {
        // Provide input value to the prompt and accept it
        console.log("This is for prompt");
        dialog.accept("I have entered the value pls check and confirm");
      } else {
        dialog.accept();
      }
    });
    await this.page.locator(AlertClick1).click(); // Normal alert wioth only Ok
    await this.page.locator(AlertClick2).click(); // Timer alert for 5 seconds   */
    await this.page.waitForTimeout(6000);
    await this.page.locator(AlertClick3).click(); //Confirm alert
    await this.page.locator(AlertClick4).click();
  }

  async IframesCheck() {
    const iframeElement = await this.page.waitForSelector(Frame1);
    const frame = await iframeElement.contentFrame();
    console.log(await frame.locator(Frame1_Text).textContent());
  }

  async ModelCheck() {
    await this.page.locator(SmallModalBut).click();
    await this.page.locator(closesmallModelBut).click();
    await this.page.locator(LargeModalBut).click();
    await this.page.locator(closeLargeModelBut).click();
  }
}
module.exports = Alerts_Frame_Windows;
