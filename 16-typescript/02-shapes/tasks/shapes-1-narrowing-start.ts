////////
//// Blok 2, zadanie 1: lista do skompletowania w magazynie
////////
//
// KONTEKST BIZNESOWY
// Część asortymentu leży na naszych półkach, resztę wysyła partner prosto do klienta.
// W jednym zamówieniu bywa i jedno, i drugie, a magazynier pakuje wyłącznie to, co ma u siebie.
//
// DANE
// Pozycje jednego zamówienia. Każda ma symbol towaru sku i liczbę sztuk quantity, a poza tym
// pozycja z naszej półki niesie shelfCode, a pozycja od partnera nazwę partnerName:
//   { sku: "BK-100", quantity: 1, shelfCode: "A-12" }
//   { sku: "HLM-220", quantity: 2, partnerName: "Rowerownia" }
//   { sku: "PMP-030", quantity: 1, shelfCode: "C-04" }
//   { sku: "LGT-410", quantity: 3, shelfCode: "A-07" }
//   { sku: "TRN-900", quantity: 1, partnerName: "Sportmax" }
//
// USER STORY
// Jako magazynier chcę listę samych pozycji leżących na naszych półkach, aby nie szukać
// w magazynie towaru, którego u nas w ogóle nie ma.
//
// KRYTERIA AKCEPTACJI
// - pozycja zamówienia jest albo z naszej półki, albo od partnera i typ ma to rozróżniać
// - jedna funkcja bierze pozycję i mówi, czy ten towar leży u nas na półce
// - druga funkcja przechodzi listę zamówienia i zostawia tylko to, co leży na naszych półkach
// - obie funkcje mają jawny typ zwracany, tak jak wszystkie funkcje w tym kursie
// - z listy zwróconej przez drugą funkcję kod czyta półkę wprost, bez sprawdzania pozycji
// - aplikacja wypisuje jedną linię na każdą pozycję do skompletowania: półka, symbol, sztuki,
//   a na końcu podsumowanie: ile pozycji kompletujemy u siebie, a ile wysyła partner
//
// PRZYKŁADY
// sprawdzenie pozycji { sku: "BK-100", quantity: 1, shelfCode: "A-12" }    ->  true
// sprawdzenie pozycji { sku: "TRN-900", quantity: 1, partnerName: "..." }  ->  false
// odsianie listy z sekcji DANE  ->  zostają trzy pozycje: BK-100, PMP-030, LGT-410
//
// Program wypisuje:
//   A-12: BK-100 x1
//   C-04: PMP-030 x1
//   A-07: LGT-410 x3
//   Do skompletowania: 3, od partnera: 2
//

// Uwaga: gdy funkcja sprawdzająca ma jawny typ zwracany boolean, kompilator nie wie, co wynika
// z jej odpowiedzi, i odsiana lista dalej jest listą obu wariantów. Rozwiązanie stoi w sekcji 5.
