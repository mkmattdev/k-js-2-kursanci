////////
//// Blok 7: Instrukcje warunkowe i switch, rozwiązanie
////////

////////
//// Zadanie: koszt wysyłki
////////
{
  // Każdy próg pada raz i tylko jako "mniej niż", więc przedziały stykają się na tej samej
  // liczbie i granica należy do tańszego. Drabinka zatrzymuje się na pierwszym warunku,
  // który da true, więc dolnej granicy przedziału nie trzeba już domykać drugim warunkiem.
  //
  // shippingCostPln jest tu na let, bo wartość ustala dopiero drabinka. Gdyby to była
  // funkcja, każda gałąź kończyłaby się return i let nie byłby potrzebny, ale funkcje
  // wchodzą dopiero w bloku 9.

  const REDUCED_SHIPPING_LIMIT_PLN = 100;
  const FREE_SHIPPING_LIMIT_PLN = 250;
  const STANDARD_SHIPPING_PLN = 15.99;
  const REDUCED_SHIPPING_PLN = 9.99;
  const FREE_SHIPPING_PLN = 0;

  const cartValuePln = 180;
  let shippingCostPln;

  if (cartValuePln < REDUCED_SHIPPING_LIMIT_PLN) {
    shippingCostPln = STANDARD_SHIPPING_PLN;
  } else if (cartValuePln < FREE_SHIPPING_LIMIT_PLN) {
    shippingCostPln = REDUCED_SHIPPING_PLN;
  } else {
    shippingCostPln = FREE_SHIPPING_PLN;
  }

  //// Sprawdzenie

  console.log(shippingCostPln); // 9.99

  // Pozostałe przypadki z zadania, po podmianie cartValuePln:
  //  99.99  ->  15.99   pierwszy warunek, bo mniej niż 100
  // 249.99  ->   9.99   drugi warunek, bo mniej niż 250
  // 250     ->   0      żaden warunek nie łapie, zostaje else
  //   0     ->  15.99   pusty koszyk to kwota jak każda inna
}
