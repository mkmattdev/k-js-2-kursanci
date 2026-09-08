////////
//// Blok 2: Asynchroniczność
////////

////////
//// WPROWADZENIE: mistrz szachowy i dziesięć szachownic
////////
//
// Mistrz szachowy przyjeżdża na pokaz i ma zagrać z dziesięcioma przeciwnikami.
// Może to zrobić na trzy sposoby.
//
//  1. SYNCHRONICZNIE, czyli pojedynek jeden na jednego. Siada przy pierwszej szachownicy
//     i gra do końca partii. Pozostałych dziewięciu czeka. Gdy przeciwnik myśli trzy minuty,
//     mistrz przez trzy minuty patrzy w sufit. Tak działa kod, który czeka na odpowiedź
//     z serwera: linia po linii, a w tym czasie nie dzieje się nic innego.
//
//  2. WIELOWĄTKOWO, czyli dziesięciu mistrzów "klonów". Zatrudniamy dziewięciu kolegów, każdy gra
//     przy swojej szachownicy. Szybko, ale trzeba ich opłacić i pilnować, żeby sobie
//     nawzajem nie przestawiali figur. JavaScript tego nie robi: ma JEDEN wątek.
//
//  3. ASYNCHRONICZNIE. Jeden mistrz idzie wzdłuż stołu. Wykonuje ruch
//     przy pierwszej szachownicy i NIE czeka na odpowiedź, tylko przechodzi do drugiej.
//     Zanim wróci, przeciwnik zdążył się ruszyć. Mistrz nigdy nie stoi bezczynnie,
//     a dziesięć partii toczy się naraz, choć mistrz jest jeden.
//
// JavaScript gra symultanę. Ma jeden wątek, więc w danej chwili wykonuje dokładnie
// jedną rzecz, ale nie stoi nad szachownicą, gdy przeciwnik myśli. Zamiast czekać
// na odpowiedź z API, oddaje to czekanie środowisku, czyli przeglądarce albo Node,
// i idzie dalej. Gdy odpowiedź przyjdzie, wraca do tej szachownicy.
//
// Zostaje pytanie, jak się zapisuje to "wróć tu, gdy przyjdzie odpowiedź". Sposoby są trzy
// i w sekcjach 2, 4 i 5 pokazujemy je na JEDNYM zadaniu, żeby porównanie było uczciwe:
// callbacki, obietnice i async/await. Historycznie powstawały w tej kolejności i każdy
// następny naprawia to, co bolało w poprzednim.

////////
//// 1. setTimeout, czyli kod, który wykona się później
////////
{
  // setTimeout przyjmuje funkcję oraz liczbę milisekund i natychmiast oddaje sterowanie
  // kolejnym instrukcjom. Przekazaną funkcję wywołuje później środowisko, czyli Node
  // albo przeglądarka, dlatego kod stojący pod setTimeout wykonuje się przed nią.

  console.log("Zamawiam kawę");

  setTimeout(() => {
    console.log("Kawa gotowa"); // wypisze się jako ostatnie w tej sekcji
  }, 200);

  console.log("Czytam gazetę");

  // setTimeout nie zatrzymał wykonania: "Czytam gazetę" pojawiło się przed "Kawa gotowa".
}

////////
//// 2. Sposób 1: callbacki
////////
{
  // Callback to funkcja przekazana do innej funkcji po to, aby została wywołana
  // po zakończeniu operacji. W starszych API Node obowiązuje konwencja error-first:
  // pierwszym argumentem callbacku jest błąd albo null, a drugim wynik.
  //
  // To samo zadanie wraca w sekcjach 2, 4 i 5: pobierz użytkownika, potem jego posty,
  // potem komentarze do pierwszego postu. Zmienia się wyłącznie składnia.

  const KNOWN_USER_ID = 1;
  const MISSING_USER_ID = 999;
  const USER_DELAY_MS = 4000;
  const POSTS_DELAY_MS = 3000;
  const COMMENTS_DELAY_MS = 5000;

  const getUserByCallback = (userId, onDone) => {
    setTimeout(() => {
      if (userId !== KNOWN_USER_ID) {
        onDone(new Error(`Nie ma użytkownika ${userId}`));
        return;
      }

      console.log("pobrano użytkownika: Anna");
      onDone(null, { userId, name: "Anna" });
    }, USER_DELAY_MS);
  };

  const getPostsByCallback = (userId, onDone) => {
    setTimeout(() => {
      console.log("pobrano posty: 1");
      onDone(null, [{ postId: 11, title: "Pierwszy post" }]);
    }, POSTS_DELAY_MS);
  };

  const getCommentsByCallback = (postId, onDone) => {
    setTimeout(() => {
      console.log("pobrano komentarze: 1");
      onDone(null, [{ commentId: 101, text: "Świetny wpis" }]);
    }, COMMENTS_DELAY_MS);
  };

  getUserByCallback(KNOWN_USER_ID, (userError, user) => {
    if (userError) {
      console.log(`Błąd: ${userError.message}`);
      return;
    }

    getPostsByCallback(user.userId, (postsError, posts) => {
      if (postsError) {
        console.log(`Błąd: ${postsError.message}`);
        return;
      }

      getCommentsByCallback(posts[0].postId, (commentsError, comments) => {
        if (commentsError) {
          console.log(`Błąd: ${commentsError.message}`);
          return;
        }

        console.log(`Komentarze: ${comments[0].text}`);
      });
    });
  });

  // Ten sam pierwszy krok dla użytkownika, którego nie ma. Błąd pojawia się na pierwszym
  // poziomie, więc pozostałe dwa kroki już się nie wykonują.
  getUserByCallback(MISSING_USER_ID, (userError) => {
    if (userError) {
      console.log(`Błąd: ${userError.message}`);
    }
  });
}

////////
//// 3. Obietnica, czyli wynik, którego jeszcze nie ma
////////
{
  // Promise to obiekt reprezentujący wynik operacji, która dopiero trwa. Tworzymy go przez
  // new Promise z funkcją przyjmującą dwa parametry: resolve i reject. Wywołanie resolve
  // oznacza powodzenie i przekazuje wynik, wywołanie reject oznacza niepowodzenie
  // i przekazuje błąd.
  //
  // Obietnica jest w jednym z trzech stanów:
  //   pending    operacja trwa, wyniku jeszcze nie ma
  //   fulfilled  operacja zakończyła się powodzeniem, jest wynik
  //   rejected   operacja zakończyła się niepowodzeniem, jest błąd
  //
  // Ze stanu pending przechodzi do jednego z pozostałych dokładnie raz i zmiana ta jest
  // nieodwracalna. Wynik odbieramy metodą .then, błąd metodą .catch.

  const paymentAccepted = new Promise((resolve) => {
    setTimeout(() => resolve("płatność przyjęta"), 5000);
  });

  // Zaraz po utworzeniu obietnica jest w stanie pending, ponieważ setTimeout jeszcze nie minął.
  console.log(paymentAccepted); // Promise { <pending> }

  paymentAccepted.then((result) => {
    console.log(result); // "płatność przyjęta"
    console.log(paymentAccepted); // Promise { 'płatność przyjęta' }, stan fulfilled
  });

  console.log("Kod pod obietnicą - wykona się przed .then");

  const paymentRejected = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Karta odrzucona")), 300);
  });

  paymentRejected.catch((error) => {
    console.log(`Błąd: ${error.message}`); // "Błąd: Karta odrzucona"
  });
}

////////
//// 4. Sposób 2: obietnice
////////
{
  // Ponieważ .then samo zwraca obietnicę, wywołania można łączyć w łańcuch. To samo zadanie
  // co w sekcji 2, tym razem bez zagnieżdżania.
  //
  // Każde .then musi ZWRÓCIĆ obietnicę następnego kroku. Bez return łańcuch idzie dalej
  // z wartością undefined i kolejny krok dostaje puste dane zamiast wyniku poprzedniego.

  const KNOWN_USER_ID = 1;
  const MISSING_USER_ID = 999;
  const USER_DELAY_MS = 4000;
  const POSTS_DELAY_MS = 3000;
  const COMMENTS_DELAY_MS = 5000;

  const getUserByPromise = (userId) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userId !== KNOWN_USER_ID) {
          reject(new Error(`Nie ma użytkownika ${userId}`));
          return;
        }

        console.log("pobrano użytkownika: Anna");
        resolve({ userId, name: "Anna" });
      }, USER_DELAY_MS);
    });

  const getPostsByPromise = (userId) =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log("pobrano posty: 1");
        resolve([{ postId: 11, title: "Pierwszy post" }]);
      }, POSTS_DELAY_MS);
    });

  const getCommentsByPromise = (postId) =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log("pobrano komentarze: 1");
        resolve([{ commentId: 101, text: "Świetny wpis" }]);
      }, COMMENTS_DELAY_MS);
    });

  // Łańcuch jest płaski zamiast zagnieżdżony, a obsługa błędu jest jedna dla całego łańcucha:
  // odrzucenie dowolnego ogniwa pomija pozostałe wywołania .then i trafia do .catch.
  getUserByPromise(KNOWN_USER_ID)
    .then((user) => {
      return getPostsByPromise(user.userId);
    })
    .then((posts) => {
      return getCommentsByPromise(posts[0].postId);
    })
    .then((comments) => {
      console.log(`Komentarze: ${comments[0].text}`);
    })
    .catch((error) => {
      console.log(`Błąd: ${error.message}`);
    });

  // Ten sam łańcuch bez klamer i return: strzałka sama zwraca wynik wyrażenia,
  // czyli kolejną obietnicę, więc .then dostaje to samo co przy jawnym return.
  getUserByPromise(KNOWN_USER_ID)
    .then((user) => getPostsByPromise(user.userId))
    .then((posts) => getCommentsByPromise(posts[0].postId))
    .then((comments) => {
      console.log(`Komentarze: ${comments[0].text}`);
    })
    .catch((error) => {
      console.log(`Błąd: ${error.message}`);
    });

  // Ten sam pierwszy krok dla użytkownika, którego nie ma. Odrzucenie pomija wszystkie .then
  // i trafia od razu do .catch.
  getUserByPromise(MISSING_USER_ID)
    .then((user) => {
      return getPostsByPromise(user.userId);
    })
    .catch((error) => {
      console.log(`Błąd: ${error.message}`);
    });
}
