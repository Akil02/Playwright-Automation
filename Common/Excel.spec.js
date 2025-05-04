const ExcelJS = require("exceljs");

class Excel {
  async ExcelData(SheetName) {
    const workbook = new ExcelJS.Workbook();
    const path = require("path");
    console.log("Path ************************************* " + process.cwd());
    const filePath = path.join(process.cwd(), "PlaywrightExcel.xlsx");
    await workbook.xlsx.readFile(filePath);
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
