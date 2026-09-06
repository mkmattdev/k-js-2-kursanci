////////
//// Blok 12: Mapy i zbiory, rozwiązanie
////////

////////
//// Zadanie: licznik unikalnych odwiedzających
////////
{
  // map wyciąga z każdej wizyty sam identyfikator, a Set odsiewa powtórzenia, bo trzyma
  // każdą wartość najwyżej raz. Zostaje odczytać size i nie pada tu ani jeden warunek.

  const visitLog = [
    { userId: "u_1", path: "/home" },
    { userId: "u_2", path: "/home" },
    { userId: "u_1", path: "/cart" },
    { userId: "u_3", path: "/home" },
    { userId: "u_2", path: "/checkout" },
  ];

  const countUniqueVisitors = (visits) => new Set(visits.map((visit) => visit.userId)).size;

  //// Sprawdzenie

  console.log(countUniqueVisitors(visitLog)); // 3
  console.log(countUniqueVisitors([])); // 0

  // KONTRPRZYKŁAD: identyfikatory są napisami i dlatego się scalają. Gdyby log wskazywał
  // na obiekty użytkownika, Set porównywałby je po referencji, a nie po treści.
  console.log(new Set([{ id: "u_1" }, { id: "u_1" }]).size); // 2
  console.log(new Set(["u_1", "u_1"]).size); // 1
}
