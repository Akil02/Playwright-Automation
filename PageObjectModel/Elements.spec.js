const { test, expect } = require("@playwright/test");
const path = require("path");
const ExcelJS = require("exceljs");
import Excel from "../Common/Excel.spec";
const excel = new Excel();
const workbook = new ExcelJS.Workbook();

let TextBox = "Text Box";
let FullName = "Full Name";
let Email = "#userEmail";
let CurrentAddress = "#currentAddress";
let PermanentAddress = "#permanentAddress";
let SubmitButton = "Submit";
let HomeCheckBoxButton = "#tree-node > ol > li > span > button > svg";
let DownoadCheckBoxButton =
  "#tree-node > ol > li > ol > li:nth-child(3) > span > button > svg";
let ExcelCheckBox =
  "#tree-node > ol > li > ol > li.rct-node.rct-node-parent.rct-node-expanded > ol > li:nth-child(2) > span > label > span.rct-checkbox > svg";
let CheckBox = "Check Box";
let RadioButton = "Radio Button";
let YesButton = "#yesRadio";
let NoButton = "#noRadio";
let ImpressiveButton = "#impressiveRadio";
let WebTablesButton = "Web Tables";
let AddTableButton = "#addNewRecordButton";
let FirstName = "#firstName";
let LastName = "#lastName";
let Age = "#age";
let Salary = "#salary";
let Department = "#department";
let table = ".rt-tbody";
let Buttons = "Buttons";
let DoubleClickButton = "#doubleClickBtn";
let DoubleClickMessage = "#doubleClickMessage";
let RightClickButton = "#rightClickBtn";
let RightClickButtonMessage = "#rightClickMessage";
let ClickMeButton = "button[class='btn btn-primary']";
let ClickMeMessage = "#dynamicClickMessage";
let LinkBut = "Links";
let HomePageLink = "#simpleLink";
let Documents = "Upload and Download";
let uploadfiles = "input[type='file']";
let downloadBut = "#downloadButton";

class Elements {
  constructor(page) {
    this.page = page;
  }

  async TextBox() {
    return await this.page.getByText(TextBox);
  }

  async CheckBox() {
    return await this.page.getByText(CheckBox);
  }

  async RadioButton() {
    return await this.page.getByText(RadioButton);
  }

  async WebTablesButton() {
    return await this.page.getByText(WebTablesButton);
  }

  async ButtonsCheckBut() {
    console.log("Enable and ");
    return await this.page.getByText(Buttons);
  }

  async LinkButton() {
    return await this.page.getByText(LinkBut).first();
  }

  async UploadDownloadBut() {
    return await this.page.getByText(Documents);
  }

  async TextBoxData() {
    let worksheet = await excel.ExcelData("Sheet2");
    await this.page
      .getByPlaceholder(FullName)
      .fill(worksheet.getRow(2).getCell(1).value);
    const cellValue = worksheet.getRow(2).getCell(2).value;
    const emailValue =
      (await typeof cellValue) === "string"
        ? cellValue
        : cellValue?.text || cellValue?.result || "";
    await this.page.locator(Email).fill(emailValue);
    await this.page
      .locator(CurrentAddress)
      .fill(worksheet.getRow(2).getCell(3).value);
    await this.page
      .locator(PermanentAddress)
      .fill(worksheet.getRow(2).getCell(3).value);
    await this.page.getByText(SubmitButton).click();
    await this.page.screenshot({ path: "screenshot.png", fullPage: true });
  }

  async DownloadCheck() {
    await this.page.locator(HomeCheckBoxButton).click();
    await this.page.locator(DownoadCheckBoxButton).click();
    await this.page.locator(ExcelCheckBox).click();
  }

  async RadioButtonSelect(value) {
    if (value == 1) {
      await this.page.locator(YesButton).click({ force: true });
    } else if (value == 0) {
      console.log("This button is not clickable");
    } else {
      await this.page.locator(ImpressiveButton).click({ force: true });
    }
  }

  async AddNewWebTable() {
    console.log("Table added");
    console.log(
      "visible : " +
        (await this.page.locator(AddTableButton).isVisible()) +
        "and is enabled? : " +
        (await this.page.locator(AddTableButton).isEnabled())
    );
    let worksheet1 = await excel.ExcelData("Sheet3");
    let rowLength = await worksheet1.rowCount;
    let DataPresent = false;
    for (let a = 2; a <= rowLength; a++) {
      if ((await worksheet1.getRow(a).getCell(7).value) == "No") {
        const cellValue = worksheet1.getRow(a).getCell(3).value;
        const emailValue =
          (await typeof cellValue) === "string"
            ? cellValue
            : cellValue?.text || cellValue?.result || "";
        await this.page.locator(AddTableButton).click();
        await this.page
          .locator(FirstName)
          .fill(worksheet1.getRow(a).getCell(1).value);
        await this.page
          .locator(LastName)
          .fill(worksheet1.getRow(a).getCell(2).value);
        await this.page.locator(Email).fill(emailValue);
        await this.page
          .locator(Age)
          .fill(worksheet1.getRow(a).getCell(4).value.toString());
        await this.page
          .locator(Salary)
          .fill(worksheet1.getRow(a).getCell(5).value.toString());
        await this.page
          .locator(Department)
          .fill(worksheet1.getRow(a).getCell(6).value);
        /*     worksheet1.getRow(a).getCell(7).value = "Yes";
        worksheet1.getRow(a).commit();
        await workbook.xlsx.writeFile(
          "C:/Playwright_Automation1/PlaywrightExcel.xlsx"
        );  */
        await this.page.getByText(SubmitButton).click();
        DataPresent = true;
        break;
      }
    }
    if (DataPresent == false) {
      console.log("Data is not present pls add new data in excel sheet");
    }
  }

  async LatestAddedWebTablesRowCheck(name) {
    let TableCount = table + " " + "> div";
    for (let a = 1; a < TableCount.length; a++) {
      let TableName =
        ".rt-tbody > div:nth-of-type(" + a + ") > div > div:nth-of-type(1)";
      if ((await this.page.locator(TableName).textContent()) == name) {
        return a;
      }
    }
    return -1;
  }

  async ButtonsCheck() {
    await this.page.dblclick(DoubleClickButton);
    await expect(this.page.locator(DoubleClickMessage)).toBeVisible();
    await this.page.click(RightClickButton, { button: "right" });
    await expect(this.page.locator(RightClickButtonMessage)).toBeVisible();
    await this.page.locator(ClickMeButton).last().click();
    await expect(this.page.locator(ClickMeMessage)).toBeVisible();
  }

  async NewTabValidationCheck() {
    const [newTab] = await Promise.all([
      this.page.context().waitForEvent("page"), // Wait for a new page (tab)
      this.page.locator(HomePageLink).click(),
    ]);
    await newTab.waitForLoadState();
    //newpage valication
    await newTab.getByText("Elements").click();
    await newTab.close();
    //Back to orrigial page check the API call link next
    const response = await this.page.request.get("https://demoqa.com/created");
    if (response.ok()) {
      console.log("Api is success ***********!");
    } else {
      console.error(`Failed with status: ${response.status()}`);
    }
  }

  async UploadAndDownloadDocuments() {
    const fileInput = await this.page.locator(uploadfiles);
    const filePath = path.join(process.cwd(), "Screenshot.png");
    await fileInput.setInputFiles(filePath);
    //download need to handle later
    const [download] = await Promise.all([
      this.page.waitForEvent("download"), // Wait for the download to start
      this.page.locator(downloadBut).click(), // Replace with the correct selector
    ]);
    // Save the downloaded file
    const downloadPath = await download.path();
    console.log(`Downloaded file saved at: ${downloadPath}`);
    await download.saveAs("./downloaded_image.jpg");
  }
}
module.exports = Elements;
