const { test, expect } = require("@playwright/test");
const { count } = require("console");
const path = require("path");
//const { runInThisContext } = require("vm");

let practiceForms = "Practice Form";
let firstName = "#firstName";
let lastName = "#lastName";
let email = "#userEmail";
let gender = "input[name='gender']"; //three elements
let mobileNumber = "#userNumber";
let dob = "#dateOfBirthInput";
let dob_YearButton = ".react-datepicker__year-select";
let dob_monthSelect = ".react-datepicker__month-select";
let dob_daySelect = "[class = 'react-datepicker__month'] > div";
let subjects = "#subjectsInput";
let subjectDropdown = "[class*='subjects-auto-complete__option']";
let hobbies = "input[type = 'checkbox']"; // three elements
//let uploadPicture = "#uploadPicture";
let address = "#currentAddress";
let state = "Select State";
let city = "Select City";
let submitButton = "Submit";

class Forms {
  constructor(page) {
    this.page = page;
  }

  async practiceFormButt() {
    await this.page.getByText(practiceForms).click();
  }

  async FormDetails(
    Gender,
    Year,
    Month,
    Day,
    Subject,
    Hobbies,
    Address,
    State,
    City
  ) {
    await this.page.locator(firstName).fill("Arun");
    await this.page.locator(lastName).fill("Prakash");
    await this.page.locator(email).fill("email@gmail.com");
    if (Gender == "Male") {
      await this.page.locator(gender).first().click({ force: true });
    } else if (Gender == "Female") {
      console.log(
        (await this.page.locator(gender).nth(1).isVisible()) +
          " and : " +
          (await this.page.locator(gender).nth(1).isEnabled())
      );
      await this.page.locator(gender).nth(1).click({ force: true });
    } else {
      await this.page.locator(gender).nth(2).click({ force: true });
    }
    await this.page.locator(mobileNumber).fill("4574545454");
    //(Adding DOB without using keyborad help)
    await this.page.locator(dob).click();
    //Year select
    await this.page.locator(dob_YearButton).click();
    await this.page.selectOption(dob_YearButton, Year);
    //Month select
    await this.page.locator(dob_monthSelect).click();
    await this.page.selectOption(dob_monthSelect, Month);
    //Day select
    let dateclicked = false;
    var dayCheck = await this.page.locator(dob_daySelect).count();
    for (let i = 1; i <= dayCheck; i++) {
      if (dateclicked == true) {
        break;
      }
      let row_loc = dob_daySelect + ":nth-child(" + i + ") > div";
      let rowcount = await this.page.locator(row_loc).count();
      for (let y = 1; y <= rowcount; y++) {
        let eachcolumn = row_loc + ":nth-child(" + y + ")";
        let text = await this.page.locator(eachcolumn).textContent();
        let value = await this.page
          .locator(eachcolumn)
          .getAttribute("aria-label");
        if (value.includes(Month) && text == Day) {
          await this.page.locator(eachcolumn).click();
          dateclicked = true;
          break;
        }
      }
    }
    await this.page.locator(subjects).fill(Subject);
    await this.page.locator(subjectDropdown).click();
    if (Hobbies == "Sports") {
      await this.page.locator(hobbies).first().click();
    } else if (Hobbies == "Reading") {
      console.log(
        (await this.page.locator(hobbies).nth(1).isVisible()) +
          " and : " +
          (await this.page.locator(hobbies).nth(1).isEnabled())
      );
      await this.page.locator(hobbies).nth(1).click({ force: true });
    } else {
      await this.page.locator(hobbies).nth(2).click();
    }
    await this.page.locator(address).fill(Address);
    await this.page.getByText(state).click();
    await this.page.getByText(State).click();
    await this.page.getByText(city).click();
    await this.page.getByText(City).click();
    await this.page.getByText(submitButton).click();
  }
}
module.exports = Forms;
