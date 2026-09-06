////////
//// Blok 8: Pętle, zadanie
////////

////////
//// Zadanie: obrót dnia
////////
{
  // KONTEKST KOMERCYJNY
  // Panel analityczny, raport sprzedaży. Przy każdym dniu miesiąca stoi kolumna "obrót",
  // a pod nią lista kwot ze wszystkich transakcji tego dnia.
  //
  // CO MASZ ZROBIĆ
  // Zsumuj kwoty z transactionsPln i zapisz wynik w totalPln.
  // Piszesz to gołą pętlą, bo o pętlach jest ten blok.
  // Pusta lista ma dać 0, a kwoty ujemne, czyli zwroty, liczą się na równi z resztą.
  //
  // MA DZIAŁAĆ TAK
  // [120, 80, 45]  ->  245
  // [-50, -30]     ->  -80
  // []             ->  0

  const transactionsPln = [120, 80, 45];

  // TODO: zacznij od wartości, która jest poprawną odpowiedzią dla pustej listy,
  // potem przejdź pętlą po kwotach i dodawaj je do totalPln
  let totalPln;

  //// Sprawdzenie

  console.log(totalPln); // ma być: 245

  // Potem podmieniaj transactionsPln i odpalaj jeszcze raz:
  // [-50, -30] ma dać -80, a [] ma dać 0.
}
