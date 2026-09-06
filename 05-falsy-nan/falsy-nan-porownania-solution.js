////////
//// Blok 5: Falsy, NaN i porównania, rozwiązanie
////////

////////
//// Zadanie: napiwek z formularza płatności
////////
{
  // ?? pyta wyłącznie o null i undefined, więc świadome 0 przechodzi dalej nietknięte.
  // || pytałoby o falsy, czyli doliczyłoby napiwek, którego klient nie chciał.

  const SUGGESTED_TIP_PLN = 5;
  const enteredTipPln = 0;

  const tipToChargePln = enteredTipPln ?? SUGGESTED_TIP_PLN;

  //// Sprawdzenie

  console.log(tipToChargePln); // 0

  // Pozostałe przypadki z zadania.
  console.log(12 ?? SUGGESTED_TIP_PLN); // 12
  console.log(undefined ?? SUGGESTED_TIP_PLN); // 5
  console.log(null ?? SUGGESTED_TIP_PLN); // 5

  // KONTRPRZYKŁAD: to samo zadanie na ||, czyli napiwek doliczony wbrew klientowi
  console.log(0 || SUGGESTED_TIP_PLN); // 5, a miało być 0
}
