////////
//// Blok 8: Pętle, rozwiązanie
////////

////////
//// Zadanie: obrót dnia
////////
{
  // Akumulator startuje z zera, bo zero jest elementem neutralnym dodawania: pusta lista
  // daje wtedy 0, a nie undefined. Zostawiony bez wartości startowej totalPln jest undefined,
  // a undefined + 120 daje NaN, więc pierwsza kwota psuje cały wynik.
  //
  // totalPln jest na let, bo jego wartość naprawdę zmienia się w każdym obrocie pętli.

  const transactionsPln = [120, 80, 45];

  let totalPln = 0;

  for (const amountPln of transactionsPln) {
    totalPln += amountPln;
  }

  //// Sprawdzenie

  console.log(totalPln); // 245

  // Pozostałe przypadki z zadania, po podmianie transactionsPln:
  // [-50, -30]  ->  -80   minus nie wymaga osobnej gałęzi, dodawanie robi to samo
  // []          ->    0   pętla nie wykonuje się ani razu, zostaje wartość startowa

  // KONTRPRZYKŁAD: ten sam kod bez wartości startowej
  let brokenTotalPln;

  for (const amountPln of transactionsPln) {
    brokenTotalPln += amountPln;
  }

  console.log(brokenTotalPln); // NaN, bo undefined + liczba to NaN; przy pustej liście zostaje undefined
}
