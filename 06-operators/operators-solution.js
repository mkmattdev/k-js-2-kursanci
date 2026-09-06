////////
//// Blok 6: Operatory, rozwiązanie
////////

////////
//// Zadanie: pakowanie zamówienia w kartony
////////
{
  // Zwykłe dzielenie oddaje ułamek, a pół kartonu nie istnieje, więc obcinamy je przez
  // Math.floor. Reszta z tego samego dzielenia to dokładnie sztuki luzem, czyli operator %.

  const MAX_ITEMS_PER_PACKAGE = 4;
  const itemCount = 10;

  const fullPackageCount = Math.floor(itemCount / MAX_ITEMS_PER_PACKAGE);
  const remainingItemCount = itemCount % MAX_ITEMS_PER_PACKAGE;

  //// Sprawdzenie

  console.log(fullPackageCount); // 2
  console.log(remainingItemCount); // 2

  // Pozostałe przypadki z zadania, te same dwa wyrażenia na innych danych.
  console.log(Math.floor(8 / MAX_ITEMS_PER_PACKAGE), 8 % MAX_ITEMS_PER_PACKAGE); // 2 0
  console.log(Math.floor(3 / MAX_ITEMS_PER_PACKAGE), 3 % MAX_ITEMS_PER_PACKAGE); // 0 3

  // KONTRPRZYKŁAD: samo dzielenie daje 2.5 kartonu, a takiego kartonu nikt nie zapakuje
  console.log(10 / MAX_ITEMS_PER_PACKAGE); // 2.5
}
