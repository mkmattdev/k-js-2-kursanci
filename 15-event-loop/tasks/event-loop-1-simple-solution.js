////////
//// Blok 3, zadanie 1: w jakiej kolejności to się wypisze, rozwiązanie
////////
{
  // ODPOWIEDŹ: A D C B
  //
  //   A   synchronicznie, pierwsza linia na stosie
  //   D   synchronicznie, bo setTimeout i .then tylko ZAPISUJĄ callback do kolejki
  //       i natychmiast oddają sterowanie dalej
  //   C   mikrozadanie, wchodzi zaraz po opróżnieniu stosu
  //   B   makrozadanie, wchodzi na końcu, mimo że opóźnienie wynosi 0 ms
  //
  // Najczęstszy błąd to postawienie B przed C, czyli założenie, że zero milisekund
  // oznacza "natychmiast".

  console.log("A");

  setTimeout(() => console.log("B"), 0);

  Promise.resolve().then(() => console.log("C"));

  console.log("D");
}
