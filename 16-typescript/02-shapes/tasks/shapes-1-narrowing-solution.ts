// 1. Definicja typów dla: - DONE
// a) StockLine
// b) PartnerLine
// c) OrderLine jako unia StockLine i PartnerLine

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

// 2. Utworzenie tablicy dla OrderLine - DONE

// TABLICA = JEDNO ZAMóWIENIE, KTóRE ZAWIERA WIELE PRODUKTóW
const orderLines: OrderLine[] = [
  { sku: "BK-100", quantity: 1, shelfCode: "A-12" }, // produkt 1
  { sku: "HLM-220", quantity: 2, partnerName: "Rowerownia" }, // produkt 2
  { sku: "PMP-030", quantity: 1, shelfCode: "C-04" }, // produkt 3
  { sku: "LGT-410", quantity: 3, shelfCode: "A-07" }, // produkt 4
  { sku: "TRN-900", quantity: 1, partnerName: "Sportmax" }, // produkt 5
];

// TODO: Punkt 3, 4, 5, 6

// UWAGI:
// Uwaga do pkt nr 3 - można to zrobić .filter
// Aby zrobić zadanie z wykorzystaniem metody .filter - doczytaj czym jest funkcja predykatu - czyli nasz customowy sposób na narrowing
const isStockLine = (line: OrderLine): line is StockLine => "shelfCode" in line;

// 3. Napisanie funkcji, która sprawdza, czy dany produkt jest u nas w magazynie - ma zwracać true albo false

// 4. Utworzenie tablicy z produktami, które są u nas w magazynie (a nie u partnera)

// 5. Utworzenie funkcji, która formatuje i zwraca informacje wg wzoru: shelfCode: sku x quantity

// 6. Własne testy funkcjonalności
// Oczekiwany rezultat w terminalu:

// Program wypisuje:
//   A-12: BK-100 x1
//   C-04: PMP-030 x1
//   A-07: LGT-410 x3
//   Do skompletowania: 3, od partnera: 2
