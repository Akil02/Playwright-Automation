import { test1 } from "../Fixtures/Fixture.spec";
import HomePage from "../PageObjectModel/HomePage.spec";
import ElementPage from "../PageObjectModel/Elements.spec";

test1(
  "Test case to check all functinality under elements tab",
  async ({ Page }) => {
    await Page.goto("/");
    const home = new HomePage(Page);
    await (await home.Elements()).click();
    const element = new ElementPage(Page);
    await (await element.TextBox()).click();
    await element.TextBoxData();
    await (await element.CheckBox()).click();
    await element.DownloadCheck();
    await (await element.RadioButton()).click({ force: false });
    await element.RadioButtonSelect(1);
    await (await element.WebTablesButton()).click();
    await element.AddNewWebTable();
    console.log(
      "The newly added table is in " +
        (await element.LatestAddedWebTablesRowCheck("Dhoni")) +
        " row of the table"
    );
    await (await element.ButtonsCheckBut()).click();
    await element.ButtonsCheck();
    await (await element.LinkButton()).click();
    await element.NewTabValidationCheck();
    await (await element.UploadDownloadBut()).click();
    await element.UploadAndDownloadDocuments();
  }
);
