////////
//// Blok 12: Mapy i zbiory
////////

////////
//// WIEDZA W PIGUŁCE
////////
//
//  1. Set to zbiór bez powtórzeń: trzyma każdą wartość najwyżej raz.
//     Metody: add, has, delete. Do tego właściwość size, czyli bez nawiasów.
//     Nie ma indeksów ani sortowania.
//
//  2. Najczęstsze zastosowanie Set to odsianie duplikatów: [...new Set(tablica)].
//
//  3. Map to słownik z kluczem DOWOLNEGO typu: liczbą, obiektem, funkcją.
//     Metody: set, get, has, delete. Do tego właściwość size, tak samo bez nawiasów.
//
//  4. Klucz zwykłego obiektu zawsze jest napisem, a klucze będące nieujemnymi liczbami
//     całkowitymi obiekt sam ustawia rosnąco. Map zachowuje kolejność wstawiania i to jest
//     główny powód, żeby po nią sięgnąć.
//
//  5. Brak klucza w Map to nie błąd, tylko undefined.
//
//  6. for...of po Set daje wartości, a po Map pary [klucz, wartość], które zwykle od razu
//     destrukturyzujemy. keys() i values() oddają osobno klucze i wartości,
//     a spread zamienia każde z nich w tablicę.
//
//  PUŁAPKA 1: klucze porównywane są po tożsamości, czyli obiekty po referencji, nie po treści.
//  Jest to === z jednym odstępstwem: NaN leży w Map i Set tylko raz, choć NaN === NaN to false.
//
//  PUŁAPKA 2: forEach dostaje najpierw WARTOŚĆ, dopiero potem klucz.
//
// Niżej to samo na żywo. Odpal: node maps-sets-demo.js

//// 1. Set: zbiór bez powtórzeń
{
  const visitedPaths = new Set();

  visitedPaths.add("/home");
  visitedPaths.add("/cart");
  visitedPaths.add("/home");

  console.log(visitedPaths.size); // 2, drugie "/home" nic nie dodało
  console.log(visitedPaths.has("/cart")); // true

  console.log([...new Set(["a", "b", "a", "c"])]); // [ 'a', 'b', 'c' ]
}

//// 2. Map: słownik z kluczem dowolnego typu
{
  const pricePlnByProduct = new Map();

  pricePlnByProduct.set("laptop", 3499);
  pricePlnByProduct.set("mouse", 129.99);

  console.log(pricePlnByProduct.get("laptop")); // 3499
  console.log(pricePlnByProduct.get("monitor")); // undefined, brak klucza to nie błąd
  console.log(pricePlnByProduct.has("mouse"), pricePlnByProduct.size); // true 2

  // Mapę da się zbudować od razu z tablicy par [klucz, wartość].
  const labelByRound = new Map([
    [10, "runda dziesiąta"],
    [2, "runda druga"],
  ]);

  console.log([...labelByRound.keys()]); // [ 10, 2 ], obiekt ustawiłby te klucze rosnąco
  console.log(labelByRound.get("10")); // undefined, "10" to inny klucz niż 10
}

//// 3. Iteracja i konwersja
{
  const pricePlnByProduct = new Map([
    ["laptop", 3499],
    ["mouse", 129.99],
  ]);

  for (const [productName, pricePln] of pricePlnByProduct) {
    console.log(`${productName}: ${pricePln}`); // "laptop: 3499", potem "mouse: 129.99"
  }

  console.log([...pricePlnByProduct.values()]); // [ 3499, 129.99 ]
}

//// PUŁAPKA 1: klucz porównywany jest po tożsamości, czyli obiekt po referencji
// KONTRPRZYKŁAD: bliźniaczy obiekt o tej samej treści to INNY klucz i nic pod nim nie leży
{
  const anna = { id: "u_1", name: "Anna" };
  const visitCountByUser = new Map([[anna, 4]]);

  console.log(visitCountByUser.get(anna)); // 4
  console.log(visitCountByUser.get({ id: "u_1", name: "Anna" })); // undefined

  // To samo w Set: dwa bliźniacze obiekty zajmują dwa miejsca, dwa równe prymitywy jedno.
  console.log(new Set([{ id: "u_1" }, { id: "u_1" }]).size); // 2
  console.log(new Set(["u_1", "u_1"]).size); // 1

  // Jedyne odstępstwo od ===: NaN mieści się w zbiorze tylko raz, mimo że sam sobie nierówny.
  console.log(new Set([NaN, NaN]).size); // 1
}

//// PUŁAPKA 2: forEach dostaje najpierw wartość, potem klucz
// KONTRPRZYKŁAD: nazwy produktów wylądowały w zmiennej pricePln i odwrotnie
{
  const pricePlnByProduct = new Map([
    ["laptop", 3499],
    ["mouse", 129.99],
  ]);

  pricePlnByProduct.forEach((productName, pricePln) => {
    console.log(`${productName}: ${pricePln}`); // "3499: laptop", potem "129.99: mouse"
  });

  // Podpis wzorowany na Array.prototype.forEach: najpierw element, potem to, czym go
  // adresujemy. W tablicy adresem jest indeks, w mapie klucz, więc klucz jest DRUGI.
  pricePlnByProduct.forEach((pricePln, productName) => {
    console.log(`${productName}: ${pricePln}`); // "laptop: 3499", potem "mouse: 129.99"
  });
}
