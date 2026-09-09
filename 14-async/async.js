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

////////
//// 5. Sposób 3: async i await
////////
{
  // Słowo async przed funkcją sprawia, że funkcja zawsze zwraca obietnicę. Słowo await
  // wstrzymuje wykonanie tej funkcji do czasu rozstrzygnięcia obietnicy i zwraca jej wynik.
  // Jeżeli obietnica zostanie odrzucona, await zgłasza wyjątek, który przechwytuje
  // zwykły blok try/catch.

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

  // await działa tylko wewnątrz funkcji async, dlatego ten wariant, w odróżnieniu
  // od dwóch poprzednich, musi mieć własną funkcję.
  const showComments = async (userId) => {
    try {
      const user = await getUserByPromise(userId);
      const posts = await getPostsByPromise(user.userId);
      const comments = await getCommentsByPromise(posts[0].postId);

      console.log(`Komentarze: ${comments[0].text}`);
    } catch (error) {
      console.log(`Błąd: ${error.message}`);
    }
  };

  // Obsługa błędów opiera się na tym samym try/catch, który omawialiśmy w bloku 1,
  // a kod czyta się jak synchroniczny. Trzy instrukcje await zapisane jedna pod drugą
  // oznaczają jednak wykonanie sekwencyjne. Sekcja 7 pokazuje, jak wpływa to na czas.
  showComments(KNOWN_USER_ID);
  showComments(MISSING_USER_ID);
}

////////
//// 6. Promise.all kontra Promise.allSettled
////////
{
  // Oba kombinatory przyjmują tablicę obietnic i zwracają jedną obietnicę, ale różnią się
  // reakcją na porażkę.
  //
  // Promise.all zwraca tablicę wyników w kolejności wejścia, a nie w kolejności ukończenia.
  // Jeżeli choć jedna obietnica zostanie odrzucona, cały Promise.all zostaje odrzucony
  // z tym samym błędem, a wyniki pozostałych przepadają.
  //
  // Kiedy tego chcemy: sprzedaż wycieczki to rezerwacja lotu, hotelu i ubezpieczenia naraz.
  // Jeżeli hotel odmówi, klientowi nie sprzedajemy samego lotu z ubezpieczeniem, tylko
  // odrzucamy całe zamówienie. Wszystko albo nic.
  //
  // Promise.allSettled czeka na wszystkie niezależnie od wyniku i nigdy nie jest odrzucony.
  // Zwraca tablicę obiektów { status: "fulfilled", value } albo { status: "rejected", reason },
  // dzięki czemu operacje udane można oddzielić od nieudanych.
  //
  // Kiedy tego chcemy: strona główna sklepu ma trzy kafelki, czyli polecane produkty,
  // ostatnie zamówienia i kurs walut. Jeżeli kurs walut nie przyjdzie, klient ma zobaczyć
  // dwa pozostałe kafelki, a nie pustą stronę.

  // Trzy operacje: dwie się udają, trzecia zawodzi. Obietnica rozstrzyga się raz, więc te same
  // trzy obiekty można przekazać obu kombinatorom.
  const stock = new Promise((resolve) => setTimeout(() => resolve("towar dostępny"), 200));
  const payment = new Promise((resolve) => setTimeout(() => resolve("płatność potwierdzona"), 300));

  // Same udane: wyniki wracają w kolejności wejścia, mimo że payment kończy się później.
  Promise.all([stock, payment]).then((results) => {
    console.log(results); // [ 'towar dostępny', 'płatność potwierdzona' ]
  });

  const recommendations = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Silnik rekomendacji nie odpowiada")), 250);
  });

  // Z jedną odrzuconą: cały all zostaje odrzucony, a wyniki dwóch udanych przepadają.
  Promise.all([stock, payment, recommendations])
    .then((results) => {
      console.log(results); // nie wykona się
    })
    .catch((error) => {
      console.log(`all odrzucone: ${error.message}`);
    });

  // allSettled: ten sam zestaw, ale w wyniku jest także operacja nieudana.
  Promise.allSettled([stock, payment, recommendations]).then((results) => {
    console.log(results[0]); // { status: 'fulfilled', value: 'towar dostępny' }
    console.log(results[2].status, "|", results[2].reason.message); // rejected | Silnik ...
    console.log(results.map((result) => result.status)); // [ 'fulfilled', 'fulfilled', 'rejected' ]
  });
}

////////
//// 7. Po kolei kontra równolegle
////////
{
  // Instrukcja await wstrzymuje funkcję, więc await w kolejnych liniach oznacza, że drugie
  // zapytanie zostaje wysłane dopiero wtedy, gdy pierwsze zwróciło odpowiedź.
  // Aby wykonać operacje równolegle, najpierw uruchamiamy je wszystkie, a dopiero potem
  // czekamy na wyniki.

  const wait = (delayMs) => new Promise((resolve) => setTimeout(resolve, delayMs));
  const loadReport = (reportName) => wait(3000).then(() => reportName);

  const demoSequentialVersusParallel = async () => {
    console.time("po kolei");
    await loadReport("sprzedaż");
    await loadReport("zwroty");
    await loadReport("magazyn");
    console.timeEnd("po kolei"); // około 900 ms, czyli trzy razy po 300

    console.time("równolegle");
    await Promise.all([loadReport("sprzedaż"), loadReport("zwroty"), loadReport("magazyn")]);
    console.timeEnd("równolegle"); // około 300 ms, ponieważ wszystkie trzy startują naraz

    // Po kolei pobieramy tylko wtedy, gdy krok N potrzebuje wyniku kroku N-1,
    // tak jak w sekcjach 2, 4 i 5.
  };

  demoSequentialVersusParallel();
}

////////
//// 8. fetch, czyli prawdziwa sieć
////////
{
  // fetch wysyła zapytanie HTTP i zwraca obietnicę odpowiedzi. Obietnica zostaje odrzucona
  // wyłącznie wtedy, gdy odpowiedź w ogóle nie przyszła, na przykład przy braku sieci.
  // Kod 404 albo 500 jest dla fetch poprawną odpowiedzią, dlatego status sprawdzamy
  // samodzielnie przez response.ok. Treść odczytujemy metodą response.json(),
  // która również zwraca obietnicę.

  const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

  const fetchUserName = async (userId) => {
    const response = await fetch(`${USERS_API_URL}/${userId}`);

    console.log(`status ${response.status}, response.ok = ${response.ok}`);

    // Bez tego warunku kod wykona się dalej mimo kodu 404. To API zwraca wówczas poprawny JSON, ale pusty obiekt
    if (!response.ok) {
      throw new Error(`Serwer odpowiedział kodem ${response.status}`);
    }

    const user = await response.json();

    return user.name;
  };

  const demoFetch = async () => {
    try {
      console.log(await fetchUserName(1)); // "status 200, response.ok = true", potem "Leanne Graham"
      console.log(await fetchUserName(99999)); // "status 404, response.ok = false", potem wyjątek
    } catch (error) {
      console.log(`Nie udało się pobrać: ${error.message}`);
    }
  };

  demoFetch();
}

////////
//// PUŁAPKA 1: forEach nie czeka na async
////////
{
  // forEach ignoruje wartość zwróconą przez callback, a callback oznaczony jako async
  // zwraca obietnicę. Pętla przechodzi więc do końca, zanim którakolwiek z tych obietnic
  // zostanie rozstrzygnięta.

  const reportNames = ["sprzedaż", "zwroty", "magazyn"];

  const loadReport = (reportName) =>
    new Promise((resolve) => setTimeout(() => resolve(reportName), 300));

  // Błędnie: pętla kończy się przed pierwszą odpowiedzią, więc tablica jest pusta.
  const loadedReports = [];

  reportNames.forEach(async (reportName) => {
    loadedReports.push(await loadReport(reportName));
  });

  console.log(loadedReports); // []

  // Poprawnie: map zachowuje zwracane obietnice, a Promise.all czeka na wszystkie.
  Promise.all(reportNames.map((reportName) => loadReport(reportName))).then((reports) => {
    console.log(reports); // [ 'sprzedaż', 'zwroty', 'magazyn' ]
  });
}

////////
//// PUŁAPKA 2: try/catch łapie tylko to, co dzieje się teraz
////////
{
  // Blok try obejmuje wyłącznie kod wykonywany w danej chwili. Wywołanie setTimeout kończy
  // się natychmiast, a przekazany callback zostaje wywołany później, gdy bloku try nie ma
  // już na stosie wywołań.

  // Błędnie: blok try zakończył się, zanim callback został wywołany.
  try {
    setTimeout(() => {
      // Po odkomentowaniu cały program przerywa działanie, ponieważ tego wyjątku nie
      // przechwyci już żaden blok catch. Node wypisuje go i kończy pracę, więc nie wykona
      // się nic, co czekało jeszcze w kolejce.
      // throw new Error("Awaria w callbacku");
      console.log("callback został wywołany 100 ms po zakończeniu bloku try");
    }, 100);
  } catch (error) {
    console.log("ten komunikat nigdy się nie wypisze");
  }

  // Poprawnie: blok try/catch umieszczamy tam, gdzie kod faktycznie się wykonuje,
  // czyli wewnątrz callbacku.
  setTimeout(() => {
    try {
      throw new Error("Awaria w callbacku");
    } catch (error) {
      console.log(`Złapane na miejscu: ${error.message}`);
    }
  }, 200);
}

////////
//// WIEDZA W PIGUŁCE
////////
//
// Podsumowanie bloku. To samo, co było na żywo, zebrane w jednym miejscu.
//
//  1. setTimeout(callback, delayMs) nie zatrzymuje programu. Oddaje callback środowisku
//     i leci dalej, a callback wraca później. Podany czas to najwcześniejszy możliwy moment wykonania danego fragmentu kodu.
//
//  2. Callback to funkcja przekazana innej funkcji wywołania później.
//
//  3. Promise to obiekt reprezentujący wynik, którego jeszcze nie ma. Ma trzy stany: pending,
//     fulfilled i rejected. Ze stanu pending wychodzi raz i już z niego nie wraca.
//
//  4. .then bierze wynik i sam zwraca obietnicę, więc łańcuch jest płaski. Jeden .catch
//     na końcu łapie błąd z każdego ogniwa.
//
//  5. async przed funkcją sprawia, że ZAWSZE zwraca obietnicę. await czeka na jej wynik,
//     a błędy łapie zwykły try/catch, ten sam co w bloku 1.
//
//  6. Promise.all czeka na wszystkie i odrzuca przy PIERWSZYM błędzie. Promise.allSettled
//     czeka na wszystkie zawsze i oddaje tablicę { status, value } albo { status, reason }.
//
//  PUŁAPKA 1: forEach nie czeka na callback z async. Pętla kończy się natychmiast,
//  a wynik zostaje pusty.
//
//  PUŁAPKA 2: try/catch łapie tylko to, co dzieje się TERAZ. Błąd rzucony w callbacku
//  setTimeout nie ma już swojego try na stosie i ubija proces.
