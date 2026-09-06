////////
//// Blok 5: Falsy, NaN i porównania
////////

////////
//// WIEDZA W PIGUŁCE
////////
//
//  1. Falsy jest osiem: false, 0, -0, 0n, "", null, undefined i NaN. W praktyce liczy się
//     sześć, bo -0 i 0n trafiają się rzadko. Wszystko inne jest truthy, także "0", "false",
//     pusta tablica i pusty obiekt.
//
//  2. === najpierw porównuje typ: różny typ to od razu false, bez konwersji.
//
//  3. == przy różnych typach konwertuje operandy i dopiero potem porównuje. Spod tej konwersji
//     wyjęta jest para null i undefined: == uznaje je za równe sobie i niczemu więcej.
//     W kursie zawsze ===.
//
//  4. NaN powstaje z działania bez sensu liczbowego, jest typu number i nie równa się
//     samemu sobie. Wykrywa je Number.isNaN, nigdy porównanie.
//
//  5. "Falsy" i "brak wartości" to nie to samo: 0 i "" są poprawnymi danymi,
//     a brak wartości to wyłącznie null i undefined.
//
//  6. Do wartości zastępczej służy ??, bo reaguje dokładnie na null i undefined.
//
//  PUŁAPKA 1: || wchodzi przy KAŻDEJ wartości falsy, więc kasuje świadome 0 i pusty tekst.
//
//  PUŁAPKA 2: globalne isNaN konwertuje argument, Number.isNaN nie.
//
// Niżej to samo na żywo. Odpal: node falsy-nan-porownania-demo.js

//// 1. Falsy i truthy
// Przejście zależy od listy falsy, nie od treści: niepusty napis "0" przechodzi, pusta tablica też.
{
  console.log(Boolean(false), Boolean(0), Boolean("")); // false false false
  console.log(Boolean(null), Boolean(undefined), Boolean(NaN)); // false false false
  console.log(Boolean("0"), Boolean("false")); // true true, to niepuste napisy
  console.log(Boolean([]), Boolean({})); // true true, pustka w środku nic tu nie zmienia
}

//// 2. === kontra ==
{
  console.log(5 === "5"); // false, inny typ
  console.log(5 == "5"); // true, bo "5" poszło na liczbę
  console.log("" == 0); // true, bo Number("") to 0
  console.log(null == undefined); // true, == wyjmuje tę parę spod konwersji
  console.log(null === undefined); // false
}

//// 3. NaN
{
  const invalidResult = Number("abc");

  console.log(invalidResult); // NaN
  console.log(typeof invalidResult); // "number"
  console.log(invalidResult === invalidResult); // false
  console.log(Number.isNaN(invalidResult)); // true, NaN wykrywamy funkcją, nie porównaniem
}

//// 4. Brak wartości kontra falsy
{
  const orderForm = { discountPercent: 0, giftMessage: "" };

  console.log(orderForm.discountPercent ?? 10); // 0, klient świadomie wybrał brak rabatu
  console.log(orderForm.giftMessage ?? "Wesołych świąt"); // "", klient skasował tekst
  console.log(orderForm.invoiceNote ?? "brak uwag"); // "brak uwag", tego pola naprawdę nie ma
}

//// PUŁAPKA 1: || jako wartość domyślna
// KONTRPRZYKŁAD: || kasuje świadomie wpisane zero i świadomie wyczyszczony tekst
{
  const orderForm = { discountPercent: 0, giftMessage: "" };

  console.log(orderForm.discountPercent || 10); // 10, a klient wybrał 0
  console.log(orderForm.giftMessage || "Wesołych świąt"); // "Wesołych świąt", a miało być pusto

  // || nadaje się tam, gdzie każda wartość falsy naprawdę ma być zastąpiona. Przy danych
  // z formularza tak prawie nigdy nie jest.
}

//// PUŁAPKA 2: globalne isNaN kontra Number.isNaN
// KONTRPRZYKŁAD: globalne isNaN najpierw konwertuje argument, a Number("") i Number(null)
// dają 0, więc puste pole i brak wartości udają przed nim poprawne liczby
{
  console.log(isNaN("abc"), isNaN("")); // true false
  console.log(isNaN(null), isNaN("   ")); // false false

  // Number.isNaN niczego nie konwertuje, true dostaje wyłącznie faktyczne NaN.
  console.log(Number.isNaN("abc"), Number.isNaN(Number("abc"))); // false true
}
