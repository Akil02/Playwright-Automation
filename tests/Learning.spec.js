const { test, expect } = require("@playwright/test");

var arr = ["Brinjal", "Potato", "Cashews"];
// "Potato", "Cashews"

let Search = "Search for Vegetables and Fruits";
let VegetableName = ".product-name";
let AddToCart = "ADD TO CART";
let ShopIcon = "Cart";
let CheckOut = "PROCEED TO CHECKOUT";
let EnterPromoCode = "Enter promo code";
let ApplyButton = "Apply";
let PromoInformation = ".promoInfo";
let PlaceOrder = "Place Order";
let AgreeCheckBox = ".chkAgree";
let ProceedButton = "Proceed";

test("This is first script", async ({ page }) => {
  //Go to the url
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
  await page.getByPlaceholder(Search).fill("Carrot");
  await page.getByPlaceholder(Search).fill("");
  const vegname = await page.$$(VegetableName);
  let num = 0;
  //Add all the vegetables in the cart
  for (const veg of vegname) {
    const val1 = await veg.textContent();
    const parts = val1.split("-");
    if (arr.includes(parts[0].trim())) {
      await page.getByText(AddToCart).nth(num).click();
      //Need to find a better solution
      await page.waitForTimeout(5000);
      console.log(parts[0]);
    }
    ++num;
  }
  //Check and checkout the order
  await page.getByAltText(ShopIcon).click();
  await page.getByText(CheckOut).click();

  await page.getByPlaceholder(EnterPromoCode).fill("A1234MN");
  await page.getByText(ApplyButton).click();
  const v = await page.locator(PromoInformation).textContent();
  console.log(v);
  console.log(await page.getByText(PlaceOrder).isEnabled());
  console.log(await page.getByText(PlaceOrder).isVisible());
  await page.getByText(PlaceOrder).click();
  await page.waitForTimeout(2000);
  await page.selectOption("select", { label: "India" });
  await page.locator(AgreeCheckBox).click();
  await page.getByText(ProceedButton).click();
  await page.waitForTimeout(2000);
});
