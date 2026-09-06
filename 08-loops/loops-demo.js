////////
//// Blok 8: Pętle
////////

////////
//// WIEDZA W PIGUŁCE
////////
//
//  1. for ma w nawiasie trzy sekcje: start, warunek i krok. Kręci się, dopóki warunek daje true.
//
//  2. for...of idzie po WARTOŚCIACH, bez indeksu. Do samego przejścia po tablicy czytelniejszy
//     niż for.
//
//  3. while sprawdza warunek PRZED każdą iteracją, więc ciało może nie wykonać się ani razu.
//     W warunku zawsze porównujemy z progiem, bo sama liczba znaczyłaby tylko "nie 0 i nie NaN".
//
//  4. break kończy pętlę, continue przerywa tylko bieżącą iterację. W for przechodzi po drodze
//     przez sekcję KROKU, w while wraca prosto do warunku.
//
//  5. W while inkrementacja musi stać NAD continue. Pod nim nigdy by się nie wykonała
//     i pętla kręciłaby się bez końca.
//
//  6. break i continue działają w for, for...of i while. W metodach tablicowych z bloku 11,
//     na przykład w forEach, nie działają wcale.
//
//  7. Pętla z break to prawie zawsze SZUKANIE. Gotowe narzędzia do szukania, które
//     przerywają same, omawiamy razem z tablicami w bloku 11.
//
//  PUŁAPKA 1: <= zamiast < w warunku, bo ostatni indeks tablicy to length - 1.
//
//  PUŁAPKA 2: break przerywa tylko tę pętlę, w której stoi. Z zagnieżdżonej wychodzi return.
//
// Niżej to samo na żywo. Odpal: node loops-demo.js

//// 1. for
{
  const productNames = ["Laptop", "Mouse", "Keyboard"];

  for (let productIndex = 0; productIndex < productNames.length; productIndex += 1) {
    console.log(`${productIndex}: ${productNames[productIndex]}`);
    // "0: Laptop", potem "1: Mouse", potem "2: Keyboard"
  }
}

//// 2. for...of
{
  const pricesPln = [249, 129.99, 3499];
  let totalPln = 0;

  for (const pricePln of pricesPln) {
    totalPln += pricePln;
  }

  console.log(totalPln); // 3877.99
}

//// 3. while
{
  const TICKET_PRICE_PLN = 30;
  let budgetPln = 100;
  let boughtTicketCount = 0;

  while (budgetPln >= TICKET_PRICE_PLN) {
    budgetPln -= TICKET_PRICE_PLN;
    boughtTicketCount += 1;
  }

  console.log(boughtTicketCount, budgetPln); // 3 10, reszta nie starcza na czwarty bilet
}

//// 4. break i continue
{
  const attendeeNames = ["Anna", "", "Bartek", "Celina"];

  for (const attendeeName of attendeeNames) {
    if (attendeeName === "") {
      continue;
    }

    if (attendeeName === "Bartek") {
      break;
    }

    console.log(attendeeName); // "Anna", potem pętla pomija "" i staje na "Bartek"
  }
}

//// PUŁAPKA 1: <= zamiast < w warunku
// KONTRPRZYKŁAD: ostatnia iteracja czyta undefined zamiast zgłosić błąd
{
  const productNames = ["Laptop", "Mouse"];

  for (let productIndex = 0; productIndex <= productNames.length; productIndex += 1) {
    console.log(productNames[productIndex]); // "Laptop", "Mouse", a na koniec undefined
  }
}

//// PUŁAPKA 2: break przerywa tylko jedną pętlę
// KONTRPRZYKŁAD: pętla zewnętrzna skanuje wszystkie zamówienia, choć trafienie padło
// już w pierwszym
{
  const orderItemNames = [["laptop", "torba"], ["monitor"], ["mysz"]];
  let scannedOrderCount = 0;

  for (const itemNames of orderItemNames) {
    scannedOrderCount += 1;

    for (const itemName of itemNames) {
      if (itemName === "laptop") {
        break;
      }
    }
  }

  console.log(scannedOrderCount); // 3, mimo że laptop leżał już w pierwszym zamówieniu
}

{
  // Poprawnie: pętla zewnętrzna musi się o trafieniu dowiedzieć, więc niesie je flaga.
  const orderItemNames = [["laptop", "torba"], ["monitor"], ["mysz"]];
  let scannedOrderCount = 0;
  let isLaptopFound = false;

  for (const itemNames of orderItemNames) {
    if (isLaptopFound) {
      break;
    }

    scannedOrderCount += 1;

    for (const itemName of itemNames) {
      if (itemName === "laptop") {
        isLaptopFound = true;
        break;
      }
    }
  }

  console.log(scannedOrderCount, isLaptopFound); // 1 true, skan stanął na pierwszym zamówieniu

  // Blok 9 pokaże na to krótszy sposób: return wychodzi z obu pętli naraz, bez flagi.
}
