////////
//// Blok 6: Operatory, zadanie
////////

////////
//// Zadanie: pakowanie zamówienia w kartony
////////
{
  // KONTEKST KOMERCYJNY
  // System magazynowy, ekran kompletacji. Magazynier bierze kartony, zanim zacznie pakować,
  // więc musi z góry wiedzieć, ile ich zejdzie i ile sztuk zostanie luzem.
  //
  // CO MASZ ZROBIĆ
  // Popraw dwie linie, każda ma zostać jednym wyrażeniem.
  // fullPackageCount to liczba kartonów zapełnionych W CAŁOŚCI, nigdy z ułamkiem.
  // remainingItemCount to sztuki, które nie wypełniły kolejnego kartonu.
  //
  // MA DZIAŁAĆ TAK
  // 10 sztuk  ->  2 kartony, 2 sztuki luzem
  //  8 sztuk  ->  2 kartony, 0 sztuk luzem
  //  3 sztuki ->  0 kartonów, 3 sztuki luzem

  const MAX_ITEMS_PER_PACKAGE = 4;
  const itemCount = 10;

  // TODO: ile razy pojemność kartonu mieści się w liczbie sztuk
  const fullPackageCount = itemCount / MAX_ITEMS_PER_PACKAGE;

  // TODO: co zostaje po zapełnieniu tych kartonów
  const remainingItemCount = itemCount;

  //// Sprawdzenie

  console.log(fullPackageCount); // ma być: 2
  console.log(remainingItemCount); // ma być: 2

  // Potem podmieniaj itemCount i odpalaj jeszcze raz:
  // 8 ma dać 2 i 0, a 3 ma dać 0 i 3.
}
