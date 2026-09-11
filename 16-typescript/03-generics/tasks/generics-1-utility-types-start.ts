////////
//// Blok 3, zadanie 1: oferta bez kosztu zakupu
////////
//
// KONTEKST BIZNESOWY
// Raz dziennie wysyłamy do porównywarki cen plik z ofertą, po jednym wierszu na produkt.
// W katalogu przy produkcie stoi też koszt zakupu. Tego pola w pliku być nie może, bo
// z ceny i kosztu widać, ile zarabiamy.
//
// DANE
// Trzy produkty z katalogu. Kategoria to zawsze jedna z trzech: "elektronika", "odzież", "dom".
//   { sku: "LAP-14", name: "Laptop",   pricePln: 4000, costPln: 3100, category: "elektronika" }
//   { sku: "TSH-01", name: "Koszulka", pricePln: 79,   costPln: 32,   category: "odzież" }
//   { sku: "LMP-08", name: "Lampka",   pricePln: 149,  costPln: 90,   category: "dom" }
//
// USER STORY
// Jako opiekun katalogu chcę wysyłać do porównywarki sku, nazwę, cenę i kategorię,
// bez kosztu zakupu, żeby konkurencja nie policzyła z pliku naszej marży.
//
// KRYTERIA AKCEPTACJI
// - produkt ma pięć pól z sekcji DANE; kategoria to unia tych trzech nazw
// - wiersz oferty to ten sam produkt, tylko bez pola costPln
// - typu wiersza oferty nie wypisujesz czterema polami z ręki: robisz go z typu produktu
//   typem narzędziowym z tego bloku (wyrzucasz costPln)
// - funkcja dostaje jeden produkt i zwraca wiersz oferty, bez kosztu
// - dopisanie costPln do wiersza oferty ma nie przejść kompilacji
// - aplikacja zamienia cały katalog na ofertę i wypisuje ją, po jednej linii na produkt
//
// PRZYKŁADY
// { sku: "LAP-14", name: "Laptop", pricePln: 4000, costPln: 3100, category: "elektronika" }
//   ->  { sku: "LAP-14", name: "Laptop", pricePln: 4000, category: "elektronika" }
//
// Program wypisuje:
//   LAP-14 Laptop 4000 elektronika
//   TSH-01 Koszulka 79 odzież
//   LMP-08 Lampka 149 dom
