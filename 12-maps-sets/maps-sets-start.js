////////
//// Blok 12: Mapy i zbiory, zadanie
////////

////////
//// Zadanie: licznik unikalnych odwiedzających
////////
{
  // KONTEKST KOMERCYJNY
  // Panel analityczny, kafelek na górze pulpitu. Analityk zerka na ruch z ostatniej doby.
  // Log zapisuje każde wejście na podstronę, więc ta sama osoba stoi w nim po kilka razy.
  //
  // CO MASZ ZROBIĆ
  // Napisz countUniqueVisitors: bierze log odwiedzin, oddaje liczbę RÓŻNYCH użytkowników.
  // Ten sam userId, powtórzony w wielu wizytach, liczy się raz. Pusty log daje 0.
  //
  // MA DZIAŁAĆ TAK
  // countUniqueVisitors(visitLog)  ->  3
  // countUniqueVisitors([])        ->  0

  const visitLog = [
    { userId: "u_1", path: "/home" },
    { userId: "u_2", path: "/home" },
    { userId: "u_1", path: "/cart" },
    { userId: "u_3", path: "/home" },
    { userId: "u_2", path: "/checkout" },
  ];

  const countUniqueVisitors = (visits) => {
    // TODO: wyciągnij same identyfikatory, a powtórzenia niech odsieje struktura danych
  };

  //// Sprawdzenie

  console.log(countUniqueVisitors(visitLog)); // ma być: 3
  console.log(countUniqueVisitors([])); // ma być: 0
}
