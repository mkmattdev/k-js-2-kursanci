////////
//// Blok 3, zadanie 2: ostatnio dodane
////////
//
// KONTEKST BIZNESOWY
// Na stronie startowej panelu stoją dwa kafelki "ostatnio dodane": ostatnie dwa produkty
// z katalogu i ostatnie dwa zamówienia. Dziś są na to dwie funkcje, jedna dla produktów,
// druga dla zamówień, a różnią się wyłącznie typem listy.
//
// DANE
// Katalog, od najstarszego produktu:
//   { sku: "LAP-14", name: "Laptop" }
//   { sku: "TSH-01", name: "Koszulka" }
//   { sku: "LMP-08", name: "Lampka" }
//
// Zamówienia, od najstarszego:
//   { orderId: 1, totalPln: 4000 }
//   { orderId: 2, totalPln: 79 }
//   { orderId: 3, totalPln: 149 }
//
// USER STORY
// Jako opiekun panelu chcę jedną funkcję, która wyjmie kilka ostatnich pozycji z dowolnej
// listy, żeby kolejny kafelek nie wymagał pisania kolejnej funkcji.
//
// KRYTERIA AKCEPTACJI
// - jedna funkcja, dwa argumenty: lista oraz ile pozycji z jej końca zwrócić
// - typ elementu listy nazywasz T
// - typu przy wywołaniu nie wpisujesz z ręki, TypeScript odczytuje go z dostarczonej przy wywołaniu listy
// - z katalogu wraca lista produktów, więc wolno na niej czytać name, a z zamówień
//   lista zamówień, więc wolno czytać totalPln
// - odczyt pola, którego w danym typie nie ma, na przykład name na zamówieniu,
//   ma nie przejść kompilacji
// - liczba pozycji na kafelku siedzi w stałej, bo oba kafelki pokazują tyle samo
// - aplikacja wypisuje dwa ostatnie produkty i dwa ostatnie zamówienia, po jednej linii
//
// PRZYKŁADY
// dwie ostatnie pozycje katalogu     ->  [{ sku: "TSH-01", ... }, { sku: "LMP-08", ... }]
// dwie ostatnie pozycje z zamówień   ->  [{ orderId: 2, ... }, { orderId: 3, ... }]
//
// Program wypisuje:

//   TSH-01 Koszulka
//   LMP-08 Lampka

//   2 79
//   3 149
