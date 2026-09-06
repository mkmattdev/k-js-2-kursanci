////////
//// Blok 9: Funkcje, rozwiązanie
////////

////////
//// Zadanie: cena brutto
////////
{
  // Parametr domyślny wchodzi wyłącznie dla undefined, więc świadome 0 przechodzi dalej
  // i wynikiem jest cena netto. Zapis bez klamer ma return w domyśle.

  const DEFAULT_VAT_RATE = 0.23;

  const calculateGrossPricePln = (netPricePln, vatRate = DEFAULT_VAT_RATE) =>
    netPricePln * (1 + vatRate);

  //// Sprawdzenie

  console.log(calculateGrossPricePln(1000)); // 1230
  console.log(calculateGrossPricePln(1000, 0.08)); // 1080
  console.log(calculateGrossPricePln(1000, 0)); // 1000
}
