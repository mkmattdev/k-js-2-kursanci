////////
//// Blok 3: Pętla zdarzeń
////////

////////
//// WPROWADZENIE: pytanie podchwytliwe
////////
//
// Ten kod:
//
//   console.log("Start");
//   setTimeout(() => console.log("Timer"), 0);
//   console.log("Koniec");
//
// ZAWSZE wypisuje Start, Koniec, Timer. Na każdym komputerze i przy każdym uruchomieniu.
// Skoro opóźnienie wynosi zero milisekund, dlaczego "Timer" nie wykonuje się od razu?
//
// Odpowiedź na to jedno pytanie to cały ten blok. W bloku 2 poznaliśmy trzy sposoby
// zapisania asynchroniczności. Tutaj patrzymy na to samo od drugiej strony: kto decyduje,
// że nasz kod ma się teraz wykonać, i w jakiej kolejności podejmuje te decyzje.
// Ten mechanizm nazywa się pętlą zdarzeń.

////////
//// 1. Stos wywołań ma pierwszeństwo
////////
{
  // Kod synchroniczny wykonuje się na stosie wywołań. Dopóki cokolwiek na stosie stoi,
  // żaden callback z kolejki nie ma prawa wejść, nawet jeżeli jego czas już minął.

  console.log("stos: pierwsza linia");

  setTimeout(() => {
    console.log("kolejka: setTimeout z 0 ms");
  }, 0);

  console.log("stos: ostatnia linia");

  // Zero milisekund nie oznacza "natychmiast", tylko "najwcześniej wtedy, gdy stos
  // będzie pusty".
}

////////
//// 2. Mikrozadania przed makrozadaniami
////////
{
  // Kolejki są dwie.
  // Makrozadania to callbacki z setTimeout, setInterval i ze zdarzeń.
  // Mikrozadania to .then, .catch, .finally oraz queueMicrotask.
  // Pętla zdarzeń opróżnia CAŁĄ kolejkę mikrozadań, zanim sięgnie po pierwsze makrozadanie.

  setTimeout(() => console.log("makrozadanie: setTimeout"), 0);

  queueMicrotask(() => console.log("mikrozadanie: queueMicrotask"));

  Promise.resolve().then(() => console.log("mikrozadanie: then"));

  // Kolejność: queueMicrotask, then, setTimeout. Oba mikrozadania wyprzedzają makrozadanie,
  // a między sobą stoją w kolejności, w jakiej zostały zapisane.
}

////////
//// 3. await to też mikrozadanie
////////
{
  // await odkłada resztę ciała do kolejki mikrozadań, tak samo jak .then.

  const getCachedProfile = () => Promise.resolve({ name: "Anna" });

  const loadProfile = async () => {
    console.log("async: ciało startuje natychmiast");
    const profile = await getCachedProfile();
    console.log(`async: po await, już jako mikrozadanie, profil ${profile.name}`);
  };

  loadProfile();

  console.log("async: kod po wywołaniu wykonuje się dalej bez czekania");

  // KROK PO KROKU
  //
  //  1. JavaScript idzie od góry. Definicje funkcji nic jeszcze nie wypisują.
  //
  //  2. Wołasz loadProfile(). To zwykłe wywołanie. Ciało startuje od razu, na stosie.
  //     Dlatego pierwsze jest: "ciało startuje natychmiast".
  //
  //  3. Następna linia: await getCachedProfile(). Funkcja oddaje obietnicę z obiektem z name: Anna.
  //     Wynik jest. JavaScript i tak się zatrzymuje.
  //
  //  4. await znaczy: "tu przerywam tę funkcję". Linia z profilem Anny nie wykonuje
  //     się teraz. Idzie do kolejki mikrozadań: "wróć tu, jak stos będzie pusty".
  //
  //  5. loadProfile() kończy się na ten moment. Wywołujący dostaje obietnicę i idzie
  //     dalej. Dlatego drugie jest: "kod po wywołaniu wykonuje się dalej bez czekania".
  //
  //  6. Stos jest pusty. Pętla zdarzeń bierze kolejkę mikrozadań i wraca do reszty
  //     loadProfile. Dopiero teraz: "po await, już jako mikrozadanie, profil Anna".
  //
  //  Dlaczego przerwa, skoro Anna już jest? Bo await nie ma trybu "wynik gotowy,
  //  lecę dalej". Zawsze: przerwij, oddaj sterowanie, wróć z kolejki.
}

////////
//// WIEDZA W PIGUŁCE
////////
//
//  1. JavaScript ma jeden wątek: w danej chwili wykonuje dokładnie jedną rzecz. Wszystko,
//     co dzieje się "w tle", robi za niego środowisko, czyli przeglądarka albo Node.
//
//  2. Stos wywołań to miejsce, w którym wykonuje się kod synchroniczny. Dopóki cokolwiek
//     na nim stoi, nic z kolejek nie ma prawa wejść.
//
//  3. Kolejka mikrozadań: .then, .catch, .finally, queueMicrotask oraz cała reszta funkcji
//     async stojąca po await.
//
//  4. Kolejka makrozadań: callbacki z setTimeout, setInterval i ze zdarzeń.
//
//  5. Cykl pętli zdarzeń zaczyna się od mikrozadań. Gdy kod wykonywany na stosie dobiegnie
//     końca, a dotyczy to także samego skryptu, pętla opróżnia CAŁĄ kolejkę mikrozadań.
//     Dopiero potem bierze JEDNO makrozadanie, wykonuje je do końca i znowu opróżnia
//     mikrozadania. Dlatego mikrozadanie zawsze wyprzedzi makrozadanie, nawet gdy
//     setTimeout ma 0 ms i został zapisany wcześniej.
//
//  6. setTimeout(callback, 0) nie znaczy "natychmiast", tylko "najwcześniej wtedy, gdy stos
//     będzie pusty, a kolejka mikrozadań opróżniona".
