////////
//// Blok 7: Instrukcje warunkowe i switch, zadanie
////////

////////
//// Zadanie: koszt wysyłki
////////
{
  // KONTEKST KOMERCYJNY
  // Sklep internetowy, podsumowanie koszyka. Klient widzi koszt wysyłki obok kwoty
  // zamówienia, a sklep ma trzy progi cenowe.
  //
  // CO MASZ ZROBIĆ
  // Zapisz w shippingCostPln koszt wysyłki dla kwoty stojącej w cartValuePln.
  // Poniżej 100 zł wysyłka kosztuje 15.99, od 100 zł 9.99, od 250 zł nic.
  // Wartość progowa należy do tańszego przedziału, a pusty koszyk wpada do najdroższego.
  // Kwoty i progi bierz z gotowych stałych, nie wpisuj liczb wprost w warunki.
  //
  // MA DZIAŁAĆ TAK
  // 180     ->  9.99
  //  99.99  ->  15.99
  // 250     ->  0
  //   0     ->  15.99

  const REDUCED_SHIPPING_LIMIT_PLN = 100;
  const FREE_SHIPPING_LIMIT_PLN = 250;
  const STANDARD_SHIPPING_PLN = 15.99;
  const REDUCED_SHIPPING_PLN = 9.99;
  const FREE_SHIPPING_PLN = 0;

  const cartValuePln = 180;
  let shippingCostPln;

  // TODO: trzy progi, trzy kwoty

  //// Sprawdzenie

  console.log(shippingCostPln); // ma być: 9.99

  // Potem podmieniaj cartValuePln i odpalaj jeszcze raz:
  // 99.99 ma dać 15.99, 249.99 ma dać 9.99, 250 ma dać 0, a 0 ma dać 15.99.
}
