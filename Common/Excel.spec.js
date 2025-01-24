const ExcelJS = require("exceljs");

class Excel {
  async ExcelData(SheetName) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(
      "C:/Playwright_Automation1/PlaywrightExcel.xlsx"
    );
    const worksheet = workbook.getWorksheet(SheetName);
    // Check if the worksheet exists
    if (!worksheet) {
      console.log(`Worksheet with name "${SheetName}" not found.`);
    } else {
      console.log("Worksheet is present : " + SheetName);
    }
    return worksheet;
  }

  async generateRandomString(length = 3) {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  }
}
module.exports = Excel;
