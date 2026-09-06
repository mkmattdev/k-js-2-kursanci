////////
//// Blok 11: Tablice
////////

////////
//// WIEDZA W PIGUŁCE
////////
//
//  1. Indeksy liczą się od 0, więc ostatni element ma indeks length - 1.
//     at(-1) liczy od końca i czyta się lepiej niż products[products.length - 1].
//
//  2. Destrukturyzacja wyciąga elementy po POZYCJI, a rest zbiera resztę do nowej tablicy.
//     includes odpowiada, czy wartość w tablicy jest, indexOf oddaje jej pozycję albo -1,
//     a [...first, ...second] skleja dwie tablice w nową.
//
//  3. Mutują oryginał: push, pop, shift, unshift, splice, sort, reverse.
//
//  4. Zwracają nową tablicę: map, filter, slice, concat, toSorted, toReversed.
//     Ten podział decyduje, czy funkcja przestawi dane wywołującemu, czy odda mu kopię.
//
//  5. map przerabia każdy element i zawsze zwraca tablicę tej samej długości.
//     Do samego przejścia, bez wyniku, jest forEach.
//
//  6. Cztery pytania o ten sam warunek: filter oddaje WSZYSTKIE pasujące, find PIERWSZY
//     pasujący albo undefined, a some i every odpowiadają true albo false.
//
//  7. reduce zwija tablicę do jednej wartości. Pierwszy argument callbacku to akumulator,
//     drugi to bieżący element, a wartość początkową akumulatora podajemy zawsze.
//
//  PUŁAPKA 1: sort i toSorted bez komparatora porównują elementy jak tekst, więc 12 ląduje
//  między 1 a 3. Komparator dostaje dwa elementy i oddaje ich różnicę:
//  (first, second) => first - second.
//
//  PUŁAPKA 2: klamra po strzałce otwiera ciało funkcji, a nie literał obiektu.
//
// Niżej to samo na żywo. Odpal: node arrays-demo.js

//// 1. Tworzenie i odczyt
{
  const products = ["Laptop", "Mouse", "Keyboard"];

  console.log(products[0]); // "Laptop"
  console.log(products.length); // 3
  console.log(products.at(-1)); // "Keyboard"
  console.log(products[3]); // undefined, bo ostatni indeks to 2, a nie 3
}

//// 2. Destrukturyzacja, includes i łączenie
{
  const products = ["Laptop", "Mouse", "Keyboard", "Webcam"];
  const [firstProduct, secondProduct, ...otherProducts] = products;

  console.log(firstProduct, secondProduct); // "Laptop" "Mouse"
  console.log(otherProducts); // [ 'Keyboard', 'Webcam' ]
  console.log(products.includes("Mouse")); // true
  console.log(products.indexOf("Keyboard")); // 2, a dla braku -1
  console.log([...["Laptop"], ...["Mouse"]]); // [ 'Laptop', 'Mouse' ]
}

//// 3. Metody mutujące kontra zwracające nową tablicę
{
  const pricesPln = [249, 129.99, 3499];
  const compareAscending = (firstPricePln, secondPricePln) => firstPricePln - secondPricePln;

  console.log(pricesPln.toSorted(compareAscending)); // [ 129.99, 249, 3499 ]
  console.log(pricesPln); // [ 249, 129.99, 3499 ], oryginał nietknięty

  pricesPln.sort(compareAscending);
  console.log(pricesPln); // [ 129.99, 249, 3499 ], sort ułożył elementy w miejscu
}

//// 4. map, czyli przerób każdy element na nowy
{
  const cartItems = [
    { name: "Laptop", pricePln: 3499 },
    { name: "Mouse", pricePln: 129.99 },
  ];

  console.log(cartItems.map((cartItem) => cartItem.name)); // [ 'Laptop', 'Mouse' ]
  console.log(cartItems.map((cartItem) => cartItem.pricePln)); // [ 3499, 129.99 ]
}

//// 5. filter, find, some, every, czyli cztery pytania o ten sam warunek
{
  const EXPENSIVE_FROM_PLN = 1000;
  const pricesPln = [249, 129.99, 3499];
  const isExpensive = (pricePln) => pricePln >= EXPENSIVE_FROM_PLN;

  console.log(pricesPln.filter(isExpensive)); // [ 3499 ]
  console.log(pricesPln.find(isExpensive)); // 3499
  console.log(pricesPln.some(isExpensive)); // true, jest co najmniej jeden taki
  console.log(pricesPln.every(isExpensive)); // false, bo nie wszystkie
}

//// 6. reduce, czyli zwiń tablicę do jednej wartości
{
  const pricesPln = [249, 129.99, 3499];

  console.log(pricesPln.reduce((sumPln, pricePln) => sumPln + pricePln, 0)); // 3877.99
}

//// PUŁAPKA 1: sort i toSorted bez komparatora
// KONTRPRZYKŁAD: na liczbach jednocyfrowych ten błąd w ogóle się nie ujawnia
{
  const reviewScores = [5, 3, 9, 1, 12];
  const compareAscending = (firstScore, secondScore) => firstScore - secondScore;

  console.log(reviewScores.toSorted()); // [ 1, 12, 3, 5, 9 ]
  console.log([...reviewScores].sort()); // [ 1, 12, 3, 5, 9 ], sort robi dokładnie to samo
  console.log(reviewScores.toSorted(compareAscending)); // [ 1, 3, 5, 9, 12 ]
}

//// PUŁAPKA 2: klamra po strzałce to nie literał obiektu
// KONTRPRZYKŁAD: callback nie ma return, więc map zbiera same undefined.
// Zero błędów, zero danych.
{
  const productNames = ["Laptop", "Mouse"];

  const brokenOptions = productNames.map((productName) => {
    label: productName;
  });
  console.log(brokenOptions); // [ undefined, undefined ]

  // Poprawnie: literał obiektu w nawiasach okrągłych, wtedy klamra znaczy "obiekt".
  const productOptions = productNames.map((productName) => ({ label: productName }));
  console.log(productOptions); // [ { label: 'Laptop' }, { label: 'Mouse' } ]
}
