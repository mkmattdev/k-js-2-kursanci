////////
//// Blok 4: Typy danych i konwersje, rozwiązanie
////////

////////
//// Zadanie: cena przepisana z polskiego cennika
////////
{
  // Przecinek nie jest w JS separatorem dziesiętnym, więc zamieniamy go sami przed konwersją.
  // replace oddaje NOWY tekst, bo tekst jest niezmienny, więc jego wynik od razu wędruje
  // do Number. Number bierze CAŁY napis albo oddaje NaN, więc "125 PLN" odpada w całości.

  const unitPriceText = "79,90";

  const unitPricePln = Number(unitPriceText.replace(",", "."));

  //// Sprawdzenie

  console.log(unitPricePln); // 79.9
  console.log(typeof unitPricePln); // number

  // Pozostałe przypadki z zadania, ta sama linia na innych danych.
  console.log(Number("79.90".replace(",", "."))); // 79.9, replace nie ma czego zamienić
  console.log(Number("1250,00".replace(",", "."))); // 1250
  console.log(Number("125 PLN".replace(",", "."))); // NaN, spacja i litery to nie liczba
}
