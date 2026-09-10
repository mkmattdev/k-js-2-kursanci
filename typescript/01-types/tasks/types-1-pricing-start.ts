////////
//// Blok 1, zadanie 1: cennik promocyjny
////////
//
// KONTEKST BIZNESOWY
// Sklep prowadzi promocję na cały asortyment, a ceny w cenniku są netto. Rabat liczymy
// od ceny netto, VAT od ceny po rabacie, a każda kwota na fakturze jest zaokrąglona do dwóch
// miejsc po przecinku.
//
// DANE
// Ceny netto z cennika: 199, 49.9 i 1250 zł. Rabat wynosi 15%, a VAT 23%.
//
// USER STORY
// Jako księgowa chcę zobaczyć zestawienie cen promocyjnych brutto razem z sumą pozycji,
// aby wystawić fakturę bez przeliczania rabatu i VAT-u w arkuszu.
//
// KRYTERIA AKCEPTACJI
// - rabat i stawka VAT siedzą w stałych, a ceny w liście, po której przechodzisz
// - funkcja przyjmuje cenę netto i procent rabatu, a zwraca cenę po rabacie jako liczbę
// - druga funkcja przyjmuje cenę po rabacie i procent VAT, a zwraca cenę brutto jako liczbę
// - trzecia funkcja przyjmuje kwotę i zwraca napis z dwoma miejscami po przecinku i "zł"
// - każda z tych funkcji ma otypowane parametry i jawny typ zwracany
// - stałych i zmiennych pomocniczych nie opisujesz typem, bo kompilator odczyta go z wartości
// - aplikacja przechodzi po liście cen netto i wypisuje każdą pozycję jako kwotę brutto
// - na końcu wypisuje wiersz z sumą wszystkich pozycji
// - sumę liczysz na liczbach, a nie na gotowych napisach, bo dodanie napisów sklei kwoty
//   zamiast je zsumować
//
// PRZYKŁADY
// cena netto 199 zł przy rabacie 15%      ->  169.15
// cena po rabacie 169.15 zł przy VAT 23%  ->  208.0545
// kwota 169.15 w formacie faktury         ->  "169.15 zł"
//
// Program wypisuje:
//   208.05 zł
//   52.17 zł
//   1306.88 zł
//   Razem: 1567.10 zł
