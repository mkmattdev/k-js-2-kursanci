////////
//// Blok 4: Typy danych, tekst i konwersje
////////

////////
//// WIEDZA W PIGUŁCE
////////
//
//  1. Prymitywów jest siedem: string, number, bigint, boolean, undefined, symbol i null.
//     Wszystko poza nimi jest obiektem.
//
//  2. typeof na tablicy daje "object", na funkcji "function". Tablicę rozpoznaje Array.isArray.
//
//  3. Tekst jest NIEZMIENNY: żadna metoda nie zmienia go w miejscu, tylko ZWRACA nowy,
//     więc wynik trzeba przypisać.
//
//  4. Szablon w backtickach wstawia wartości przez ${} i może zajmować kilka linii.
//
//  5. Konwersja jawna to String, Number i Boolean. Number bierze CAŁY napis albo daje NaN,
//     a null i undefined liczy różnie: Number(null) to 0, Number(undefined) to NaN.
//
//  6. Konwersja niejawna: + przy napisie SKLEJA (do string), -, * i / zawsze liczą (do number).
//
//  7. parseInt i parseFloat czytają od początku i kończą na pierwszym nieznanym
//     znaku, więc resztę po cichu wyrzucają. parseInt wołamy zawsze z podstawą 10:
//     parseInt("42", 10).
//
//  8. Jest jeden typ number, trzymany binarnie: 0.1 nie ma dokładnego zapisu binarnego,
//     więc 0.1 + 0.2 to nie dokładnie 0.3. To samo w innych językach.
//
//  PUŁAPKA 1: typeof null to "object", więc brak wartości sprawdzamy porównaniem, nie typem.
//
//  PUŁAPKA 2: Number("") to 0, więc puste pole formularza wygląda jak wpisane 0.
//
// Niżej to samo na żywo. Odpal: node types-demo.js

//// 1. Prymitywy i typeof
{
  console.log(typeof "Laptop"); // "string"
  console.log(typeof 3499); // "number"
  console.log(typeof true); // "boolean"
  console.log(typeof undefined); // "undefined"
  console.log(typeof { name: "Laptop" }); // "object"
  console.log(typeof ["Laptop"]); // "object", tablica to też obiekt
  console.log(typeof (() => {})); // "function", jedyny wyjątek wśród obiektów
  console.log(Array.isArray(["Laptop"])); // true, tablicę rozpoznaje osobna funkcja
}

//// 2. Tekst
// Tekst czyta się indeksami jak tablicę, ale zmienić go nie da się w miejscu.
{
  const customerName = "Anna";
  const orderCount = 3;

  console.log(`${customerName} ma ${orderCount} zamówienia`); // "Anna ma 3 zamówienia"
  console.log(customerName.length); // 4
  console.log(customerName.at(-1)); // "a", at(-1) liczy od końca

  customerName.toUpperCase();
  console.log(customerName); // "Anna", metoda oddała nowy tekst, a nikt go nie przypisał

  // Metody łączy się w łańcuch. Reszta jest w dokumentacji: trim, toLowerCase, includes,
  // startsWith, slice, split, replace, padStart.
  const rawEmail = "  Anna.Kowalska@Example.COM  ";
  console.log(rawEmail.trim().toLowerCase()); // "anna.kowalska@example.com"
}

//// 3. Konwersja jawna: String, Number, Boolean
{
  console.log(String(3499)); // "3499"
  console.log(Number("3499")); // 3499
  console.log(Number("125 PLN")); // NaN, bo spacja i litery to nie liczba
  console.log(Number(null), Number(undefined)); // 0 NaN, dwa różne "puste" dają różny wynik
  console.log(Boolean(""), Boolean("0")); // false true, bo "0" to niepusty napis
}

//// 4. Konwersja niejawna: plus skleja, reszta liczy
{
  console.log("10" + 5); // "105", plus skleił
  console.log("10" - 5); // 5, minus policzył
  console.log("10" + 5 - 3); // 102, bo najpierw powstało "105", potem minus je policzył
}

//// 5. Number kontra parseInt i parseFloat
{
  const priceText = "199,99";

  console.log(Number("123abc"), parseInt("123abc", 10)); // NaN 123
  console.log(parseFloat(priceText)); // 199, przecinek to dla JS koniec liczby
  console.log(Number(priceText.replace(",", "."))); // 199.99, przecinek zamieniamy sami
}

//// 6. Jeden typ number
{
  console.log(0.1 + 0.2); // 0.30000000000000004
  console.log(Math.round((0.1 + 0.2) * 100) / 100); // 0.3, kwoty zaokrąglamy na groszach
}

//// PUŁAPKA 1: typeof null to "object"
// KONTRPRZYKŁAD: warunek oparty na typeof przepuszcza null i program wybucha kawałek dalej
{
  const shippingAddress = null;

  console.log(typeof shippingAddress); // "object", a nie "null"
  console.log(typeof shippingAddress === "object"); // true, więc taki warunek niczego nie chroni

  console.log(shippingAddress === null); // true
  console.log(shippingAddress === null || shippingAddress === undefined); // true
  // Operator ?? robi to krócej, omawiamy go w bloku 5, a ?. w bloku 6.
}

//// PUŁAPKA 2: Number("") daje 0
// KONTRPRZYKŁAD: walidacja pytająca "czy to liczba" przepuszcza puste pole formularza
{
  const quantityText = "";

  console.log(Number(quantityText)); // 0
  console.log(Number.isNaN(Number(quantityText))); // false, czyli "to poprawna liczba"

  // Najpierw pytamy, czy w polu w ogóle coś jest, dopiero potem konwertujemy.
  console.log(quantityText.trim() !== "" && Number(quantityText) > 0); // false
}
