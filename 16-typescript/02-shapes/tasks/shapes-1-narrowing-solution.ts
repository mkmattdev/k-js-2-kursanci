type StockLine = {
  sku: string;
  quantity: number;
  shelfCode: string;
};

type PartnerLine = {
  sku: string;
  quantity: number;
  partnerName: string;
};

type OrderLine = StockLine | PartnerLine;

const orderLines: OrderLine[] = [
  { sku: "BK-100", quantity: 1, shelfCode: "A-12" }, // produkt 1
  { sku: "HLM-220", quantity: 2, partnerName: "Rowerownia" }, // produkt 2
  { sku: "PMP-030", quantity: 1, shelfCode: "C-04" }, // produkt 3
  { sku: "LGT-410", quantity: 3, shelfCode: "A-07" }, // produkt 4
  { sku: "TRN-900", quantity: 1, partnerName: "Sportmax" }, // produkt 5
];

const isStockLine = (line: OrderLine): line is StockLine => "shelfCode" in line;

const selectStockLines = (lines: OrderLine[]): StockLine[] =>
  lines.filter((line) => isStockLine(line));

const linesToPick = selectStockLines(orderLines);
const partnerLineCount = orderLines.length - linesToPick.length;

for (const line of linesToPick) {
  console.log(`${line.shelfCode}: ${line.sku} x${line.quantity}`);
}
// A-12: BK-100 x1
// C-04: PMP-030 x1
// A-07: LGT-410 x3

console.log(
  `Do skompletowania: ${linesToPick.length}, od partnera: ${partnerLineCount}`,
); // Do skompletowania: 3, od partnera: 2
