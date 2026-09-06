////////
//// Blok 4: Typy danych i konwersje, zadanie
////////

////////
//// Zadanie: cena przepisana z polskiego cennika
////////
{
  // KONTEKST KOMERCYJNY
  // Sklep internetowy, formularz zamówienia. Obsługa przepisuje cenę z cennika ręcznie,
  // po polsku, czyli z groszami po przecinku. JavaScript rozumie wyłącznie kropkę.
  //
  // CO MASZ ZROBIĆ
  // Zamień unitPriceText na LICZBĘ i zapisz ją w unitPricePln.
  // Przecinek i kropka mają działać tak samo.
  // Tekst, którego nie da się przeliczyć w całości, ma dać NaN. Tak działa Number.
  //
  // MA DZIAŁAĆ TAK
  // "79,90"    ->  79.9
  // "79.90"    ->  79.9
  // "1250,00"  ->  1250
  // "125 PLN"  ->  NaN

  const unitPriceText = "79,90";

  // TODO: zrób z przecinka kropkę, potem konwertuj
  const unitPricePln = unitPriceText;

  //// Sprawdzenie

  console.log(unitPricePln); // ma być: 79.9
  console.log(typeof unitPricePln); // ma być: number

  // Potem podmieniaj unitPriceText i odpalaj jeszcze raz:
  // "79.90" ma dać 79.9, "1250,00" ma dać 1250, a "125 PLN" ma dać NaN.
}
