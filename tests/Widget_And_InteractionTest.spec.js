const { test, expect } = require("@playwright/test");
import HomePage from "../PageObjectModel/HomePage.spec";
import Widget_InteractionPage from "../PageObjectModel/Widget_And_Interaction.spec";

test("Test case to check all functinality under Widget and interactions", async ({
  page,
}) => {
  await page.goto("/");
  const home = new HomePage(page);
  await home.Widget();
  await home.Interaction();
  const Widget_Interaction = new Widget_InteractionPage(page);
  await Widget_Interaction.SliderButton();
  await Widget_Interaction.SliderCheck();
  await Widget_Interaction.DroppableButton();
  await Widget_Interaction.DragAndDropCheck();
});
