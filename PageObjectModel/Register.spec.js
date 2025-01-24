const { test, expect } = require("@playwright/test");
import Excel from "../Common/Excel.spec";
const excel = new Excel();

let FirstName = "#customer\\.firstName";
let LastName = "#customer\\.lastName";
let Address = "#customer\\.address\\.street";
let City = "#customer\\.address\\.city";
let State = "#customer\\.address\\.state";
let ZipCode = "#customer\\.address\\.zipCode";
let PhoneNumber = "#customer\\.phoneNumber";
let SSN = "#customer\\.ssn";
let UserName = "#customer\\.username";
let Password = "#customer\\.password";
let ConfirmPassword = "#repeatedPassword";
let RegisterButton = "input[value='Register']";
let LogOut = "Log Out";

class Register {
  constructor(page) {
    this.page = page;
  }

  async NewRegister() {
    const result = [];
    let worksheet = await excel.ExcelData("Sheet1");
    const randomString = await excel.generateRandomString();
    let User = worksheet.getRow(2).getCell(9).value + randomString;
    let Pass = worksheet.getRow(2).getCell(10).value;
    await this.page
      .locator(FirstName)
      .fill(await worksheet.getRow(2).getCell(1).value, { force: true });
    await this.page
      .locator(LastName)
      .fill(worksheet.getRow(2).getCell(2).value);
    await this.page.locator(Address).fill(worksheet.getRow(2).getCell(3).value);
    await this.page.locator(City).fill(worksheet.getRow(2).getCell(4).value);
    await this.page.locator(State).fill(worksheet.getRow(2).getCell(5).value);
    await this.page
      .locator(ZipCode)
      .fill(String(worksheet.getRow(2).getCell(6).value));
    await this.page
      .locator(PhoneNumber)
      .fill(String(worksheet.getRow(2).getCell(7).value));
    await this.page
      .locator(SSN)
      .fill(String(worksheet.getRow(2).getCell(8).value));
    await this.page.locator(UserName).fill(User);
    await this.page.locator(Password).fill(Pass);
    await this.page.locator(ConfirmPassword).fill(Pass);
    await this.page.locator(RegisterButton).click();
    await this.page.getByText(LogOut).click();
    result.push(User);
    result.push(Pass);
    return result;
  }
}
export default Register;
