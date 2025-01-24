const { test, expect } = require("@playwright/test");

let SliderBut = "Slider";
let ScrollLine = "[class = 'range-slider__wrap'] > input";
let DroppableBut = "Droppable";
let Dragloc = "#draggable";
let Droploc = "#droppable";

class Widget_And_Interaction {
  constructor(page) {
    this.page = page;
  }

  async SliderButton() {
    await this.page.getByText(SliderBut).click();
  }

  async DroppableButton() {
    await this.page.getByText(DroppableBut).click();
  }
  async SliderCheck() {
    console.log(
      "Before Check---- " +
        (await this.page.locator(ScrollLine).getAttribute("value"))
    );

    const elementHandle = await this.page.locator(ScrollLine);
    if (elementHandle) {
      const boundingBox = await elementHandle.boundingBox();
      if (boundingBox) {
        const sliderCenterX = boundingBox.x + boundingBox.width / 2;
        const sliderCenterY = boundingBox.y + boundingBox.height / 2;

        await this.page.mouse.move(sliderCenterX, sliderCenterY);
        await this.page.mouse.down();
        await this.page.mouse.move(sliderCenterX + 110, sliderCenterY);
        await this.page.mouse.up();
      }

      console.log(
        "After Check---- " +
          (await this.page.locator(ScrollLine).getAttribute("value"))
      );
    } else {
      console.log("Element not found");
    }
  }

  async DragAndDropCheck() {
    await this.page
      .locator(Dragloc)
      .dragTo(await this.page.locator(Droploc).first());
    await expect(await this.page.locator(Droploc).first()).toHaveText(
      "Dropped!"
    );
  }
}
module.exports = Widget_And_Interaction;
