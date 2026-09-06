////////
//// Blok 9: Funkcje
////////

////////
//// WIEDZA W PIGUŁCE
////////
//
//  1. W kursie funkcja to strzałkowa przypisana do const. Zapis bez klamer ma return
//     w domyśle, zapis z klamrami wymaga go jawnie.
//
//  2. Bez return funkcja oddaje undefined.
//
//  3. Parametr domyślny wchodzi WYŁĄCZNIE wtedy, gdy argument jest undefined.
//     null, 0 i "" go blokują, bo to konkretne wartości, a nie brak argumentu.
//
//  4. Trzy kropki w DEKLARACJI to rest: zbiera nadmiarowe argumenty do tablicy.
//
//  5. Trzy kropki w WYWOŁANIU to spread: rozsypuje tablicę na osobne argumenty.
//
//  6. Callback to funkcja przekazana jako argument. Nazwa bez nawiasów to sama funkcja,
//     nazwa z nawiasami to już jej WYNIK.
//
//  PUŁAPKA 1: zgubiony return, czyli wywołujący dostaje undefined i nie odróżni błędu
//  od poprawnego wyniku.
//
//  PUŁAPKA 2: obiekt wchodzi do funkcji przez referencję, więc zapis do jego pola
//  nadpisuje cudze dane.
//
// Niżej to samo na żywo. Odpal: node functions-demo.js

//// 1. Parametry i return
{
  const VAT_RATE = 0.23;

  // Bez klamer: return w domyśle.
  const addVat = (netPricePln) => netPricePln * (1 + VAT_RATE);

  // Z klamrami: return trzeba napisać, inaczej funkcja odda undefined.
  const describePrice = (productName, netPricePln) => {
    return `${productName}: ${addVat(netPricePln).toFixed(2)} zł brutto`;
  };

  console.log(addVat(1000)); // 1230
  console.log(describePrice("Laptop", 1000)); // "Laptop: 1230.00 zł brutto"
}

//// 2. Parametr domyślny
{
  const DEFAULT_VAT_RATE = 0.23;

  const addVat = (netPricePln, vatRate = DEFAULT_VAT_RATE) => netPricePln * (1 + vatRate);

  console.log(addVat(1000)); // 1230, brak argumentu to undefined, więc wartość domyślna wchodzi
  console.log(addVat(1000, 0.08)); // 1080
  console.log(addVat(1000, 0)); // 1000, świadome zero blokuje wartość domyślną
}

//// 3. Rest w deklaracji, spread w wywołaniu
// Te same trzy kropki, dwie odwrotne role.
{
  const sumPricesPln = (...pricesPln) => {
    let totalPln = 0;

    for (const pricePln of pricesPln) {
      totalPln += pricePln;
    }

    return totalPln;
  };

  console.log(sumPricesPln(249, 129.99, 3499)); // 3877.99
  console.log(sumPricesPln()); // 0, rest zebrał pustą tablicę

  // Math.max przyjmuje osobne liczby, a nie tablicę, więc tablicę trzeba rozsypać.
  const pricesPln = [249, 129.99, 3499];

  console.log(Math.max(...pricesPln)); // 3499
  console.log(Math.max(pricesPln)); // NaN, tablica poszła jako jeden argument
}

//// 4. Callback, czyli funkcja przekazana jako argument
{
  const add = (firstNumber, secondNumber) => firstNumber + secondNumber;

  const performOperation = (firstNumber, secondNumber, operation) =>
    operation(firstNumber, secondNumber);

  console.log(performOperation(10, 5, add)); // 15, to performOperation decyduje, kiedy wywołać

  // performOperation(10, 5, add()) policzyłoby add() PRZED wejściem do funkcji i przekazało
  // jego wynik, a nie funkcję. Potem NaN(10, 5) rzuca TypeError: operation is not a function.
}

//// PUŁAPKA 1: zgubiony return, czyli ciche undefined
// KONTRPRZYKŁAD: funkcja melduje problem w konsoli i kończy się gołym return
{
  const divide = (dividend, divisor) => {
    if (divisor === 0) {
      console.log("Zła operacja"); // "Zła operacja"
      return; // samo return oddaje undefined, bo nie ma po nim wartości
    }

    return dividend / divisor;
  };

  console.log(`Iloraz: ${divide(20, 0)}`); // "Iloraz: undefined"

  // Poprawnie: funkcja zwraca wartość ZAWSZE, a komunikat zostawia wywołującemu.
  const divideOrNull = (dividend, divisor) => (divisor === 0 ? null : dividend / divisor);

  const quotient = divideOrNull(20, 0);
  console.log(quotient === null ? "Nie dzielimy przez zero." : `Iloraz: ${quotient}`);
  // "Nie dzielimy przez zero."
}

//// PUŁAPKA 2: argument obiektowy to referencja, nie kopia
// KONTRPRZYKŁAD: parametr wskazuje na TEN SAM obiekt co zmienna wywołującego
{
  const VAT_RATE = 0.23;

  const addVatToProduct = (product) => {
    product.pricePln = product.pricePln * (1 + VAT_RATE);

    return product;
  };

  const laptop = { name: "Laptop", pricePln: 1000 };
  const laptopWithVat = addVatToProduct(laptop);

  console.log(laptop.pricePln); // 1230, oryginał też się zmienił, choć nikt o to nie prosił
  console.log(laptop === laptopWithVat); // true, to cały czas jeden i ten sam obiekt

  // Poprawnie: funkcja buduje NOWY obiekt zamiast pisać po cudzych danych.
  // Blok 10 pokaże na to krótszy zapis, na razie przepisujemy pola po kolei.
  // Nawiasy wokół klamry mówią "to obiekt", bo sama klamra po strzałce otwiera ciało funkcji.
  const createProductWithVat = (product) => ({
    name: product.name,
    pricePln: product.pricePln * (1 + VAT_RATE),
  });

  const monitor = { name: "Monitor", pricePln: 800 };

  console.log(createProductWithVat(monitor).pricePln, monitor.pricePln); // 984 800
}
