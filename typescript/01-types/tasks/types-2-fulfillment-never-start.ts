////////
//// Blok 1, zadanie 2: etapy realizacji zamówienia
////////
//
// KONTEKST BIZNESOWY
// Skaner w magazynie przesuwa zamówienie na następny etap, a w panelu klienta przycisk
// anulowania znika w chwili spakowania. Za kwartał dojdzie piąty etap i obie te rzeczy
// trzeba będzie uzupełnić.
//
// DANE
// Cztery etapy realizacji, w tej kolejności:
//   "placed", "picking", "packed", "handedToCourier"
//
// USER STORY
// Jako kierownik magazynu chcę, żeby dołożenie nowego etapu zatrzymało kompilację wszędzie
// tam, gdzie nikt go nie obsłużył, aby nie dowiadywać się o brakującej obsłudze od klienta.
//
// KRYTERIA AKCEPTACJI
// - typ etapu to unia tych czterech literałów
// - funkcja przesuwająca zamówienie przyjmuje etap i zwraca następny etap
// - dla ostatniego etapu ta funkcja rzuca Error "Paczka jest już u kuriera, nie ma
//   następnego etapu"
// - funkcja od przycisku anulowania przyjmuje etap i zwraca true do spakowania, a false
//   po spakowaniu
// - obie funkcje rozpoznają etap switchem
// - gdy do unii dojdzie piąty etap, obie funkcje mają przestać się kompilować, dopóki
//   ktoś nie dopisze jego obsługi
//
// PRZYKŁADY
// przesunięcie etapu "picking"             ->  "packed"
// przesunięcie etapu "handedToCourier"     ->  Error "Paczka jest już u kuriera, nie ma
//                                              następnego etapu"
// pytanie o anulowanie na etapie "picking" ->  true
// pytanie o anulowanie na etapie "packed"  ->  false
