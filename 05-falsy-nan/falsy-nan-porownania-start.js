////////
//// Blok 5: Falsy, NaN i porównania, zadanie
////////

////////
//// Zadanie: napiwek z formularza płatności
////////
{
  // KONTEKST KOMERCYJNY
  // Sklep internetowy, formularz płatności. Pole napiwku jest opcjonalne, więc czasem
  // przychodzi z niego kwota, a czasem nic. Napiwek 0 zł to też odpowiedź klienta.
  //
  // CO MASZ ZROBIĆ
  // Zapisz w tipToChargePln kwotę, którą naprawdę doliczymy do rachunku.
  // Kwota wpisana przez klienta wraca nietknięta, także wtedy, gdy wynosi 0.
  // Kwota sugerowana wchodzi wyłącznie przy braku wartości, czyli null albo undefined.
  //
  // MA DZIAŁAĆ TAK
  // 0          ->  0
  // 12         ->  12
  // undefined  ->  5
  // null       ->  5

  const SUGGESTED_TIP_PLN = 5;
  const enteredTipPln = 0;

  // TODO: kwota sugerowana ma wejść tylko wtedy, gdy napiwku naprawdę nie ma
  const tipToChargePln = SUGGESTED_TIP_PLN;

  //// Sprawdzenie

  console.log(tipToChargePln); // ma być: 0

  // Potem podmieniaj enteredTipPln i odpalaj jeszcze raz:
  // 12 ma dać 12, undefined ma dać 5, null ma dać 5.
}
