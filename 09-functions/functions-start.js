////////
//// Blok 9: Funkcje, zadanie
////////

////////
//// Zadanie: cena brutto
////////
{
  // KONTEKST KOMERCYJNY
  // Sklep internetowy, karta produktu. Cennik trzyma ceny netto, a klient widzi brutto.
  // Prawie wszystko idzie stawką podstawową, ale na części towarów obowiązuje inna.
  //
  // CO MASZ ZROBIĆ
  // Napisz calculateGrossPricePln: bierze cenę netto i opcjonalnie stawkę VAT.
  // Bez podanej stawki liczy stawką podstawową z gotowej stałej.
  // Podana stawka nadpisuje podstawową, także wtedy, gdy wynosi 0.
  //
  // MA DZIAŁAĆ TAK
  // calculateGrossPricePln(1000)        ->  1230
  // calculateGrossPricePln(1000, 0.08)  ->  1080
  // calculateGrossPricePln(1000, 0)     ->  1000

  const DEFAULT_VAT_RATE = 0.23;

  const calculateGrossPricePln = (netPricePln, vatRate) => {
    // TODO: stawka podstawowa ma wejść tylko wtedy, gdy nikt nie podał własnej
  };

  //// Sprawdzenie

  console.log(calculateGrossPricePln(1000)); // ma być: 1230
  console.log(calculateGrossPricePln(1000, 0.08)); // ma być: 1080
  console.log(calculateGrossPricePln(1000, 0)); // ma być: 1000
}
