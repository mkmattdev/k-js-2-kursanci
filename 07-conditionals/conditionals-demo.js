////////
//// Blok 7: Instrukcje warunkowe i switch
////////

////////
//// WIEDZA W PIGUŁCE
////////
//
//  1. if wykonuje kod w klamrach wtedy, gdy warunek jest truthy, czyli po Boolean() daje true.
//     Sześć wartości falsy znasz z bloku 5. Warunek wygodnie trzymać w nazwanej zmiennej,
//     wtedy if czyta się jak zdanie.
//
//  2. Drabinka else if zatrzymuje się na PIERWSZYM warunku, który daje true.
//     Dalszych gałęzi JS już nawet nie czyta. Końcowe else łapie resztę.
//
//  3. Ternary (warunek ? gdy true : gdy false) wybiera WARTOŚĆ, nie wykonuje instrukcji.
//     Przy trzech wynikach wraca drabinka else if.
//
//  4. switch pasuje tam, gdzie JEDNĄ wartość porównujemy z listą konkretnych przypadków.
//
//  5. break kończy switcha, sklejone puste case to jedna wspólna gałąź,
//     a default łapie wszystko, czego nie złapał żaden case.
//
//  6. Progi i kwoty trzymamy w stałych, nie w liczbach wpisanych wprost w warunek.
//
//  PUŁAPKA 1: brak break nie kończy switcha, tylko przepuszcza wykonanie do następnego case.
//
//  PUŁAPKA 2: switch porównuje przez ===, więc napis "2" nie trafi w case 2.
//
// Niżej to samo na żywo. Odpal: node conditionals-demo.js

//// 1. if
{
  const FREE_SHIPPING_LIMIT_PLN = 250;
  const cartValuePln = 300;
  const hasFreeShipping = cartValuePln >= FREE_SHIPPING_LIMIT_PLN;

  if (hasFreeShipping) {
    console.log("Wysyłka gratis."); // "Wysyłka gratis."
  }
}

//// 2. else i drabinka else if
{
  const BULK_TIER_QUANTITY = 100;
  const MEDIUM_TIER_QUANTITY = 50;
  const orderedQuantity = 60;
  let discountPercent;

  if (orderedQuantity >= BULK_TIER_QUANTITY) {
    discountPercent = 20;
  } else if (orderedQuantity >= MEDIUM_TIER_QUANTITY) {
    discountPercent = 15; // tutaj drabinka się zatrzymuje
  } else {
    discountPercent = 0;
  }

  console.log(discountPercent); // 15
}

//// 3. Operator warunkowy (ternary)
{
  const MINIMUM_ADULT_AGE = 18;
  const customerAge = 16;
  const ticketType = customerAge >= MINIMUM_ADULT_AGE ? "normalny" : "ulgowy";

  console.log(ticketType); // "ulgowy"
}

//// 4. switch
{
  const FRAGILE_PACKAGING_PLN = 6.5;
  const STANDARD_PACKAGING_PLN = 2.5;
  const NO_PACKAGING_COST_PLN = 0;

  const packagingType = "glass";

  switch (packagingType) {
    case "glass":
    case "fragile":
      console.log(FRAGILE_PACKAGING_PLN); // 6.5, wspólna gałąź szkła i towaru delikatnego
      break;
    case "standard":
      console.log(STANDARD_PACKAGING_PLN);
      break;
    default:
      console.log(NO_PACKAGING_COST_PLN);
  }

  // Ten sam switch na wartości, której nie łapie żaden case.
  const unknownPackagingType = "pallet";

  switch (unknownPackagingType) {
    case "glass":
    case "fragile":
      console.log(FRAGILE_PACKAGING_PLN);
      break;
    case "standard":
      console.log(STANDARD_PACKAGING_PLN);
      break;
    default:
      console.log(NO_PACKAGING_COST_PLN); // 0, default łapie całą resztę
  }
}

//// PUŁAPKA 1: brak break
// KONTRPRZYKŁAD: jedna płatność dostaje dwa komunikaty
{
  const paymentMethod = "card";

  switch (paymentMethod) {
    case "card":
      console.log("Płatność kartą."); // "Płatność kartą."
    case "transfer":
      console.log("Płatność przelewem."); // "Płatność przelewem.", bo wyżej zabrakło break
      break;
  }
}

//// PUŁAPKA 2: switch porównuje przez ===
// KONTRPRZYKŁAD: pole formularza oddaje tekst także wtedy, gdy użytkownik wybrał cyfrę,
// a konwersja należy do nas
{
  const selectedTicketCount = "2";

  switch (selectedTicketCount) {
    case 2:
      console.log("Bilet podwójny.");
      break;
    default:
      console.log("Nietypowa liczba biletów."); // "Nietypowa liczba biletów."
  }
}
