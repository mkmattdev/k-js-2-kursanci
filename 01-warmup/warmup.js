////////
//// WARMUP - przekrojowe sprawdzenie wiedzy z JS-1
////////

////////
//// 1. Nazewnictwo: ocena nazw
////////

// Przy każdej nazwie powiedz, czy jest dobra, czy zła, i dlaczego.
// Dla złych zaproponuj lepszą. Te reguły obowiązują przez cały kurs.
{
  const x = 10;
  const activeUserCount = 15;
  const numberOfProductsCurrentlyAvailableInMainWarehouse = 240;
  const logged = true;
  const data = { name: "Anna" };
  const user_name = "Anna";
  const getUser = "Anna";
  const titleBook = "Clean Code";
  const MAXloginAttempts = 3;
  const MAX_LOGIN_ATTEMPTS = 3;

  console.log(activeUserCount, MAX_LOGIN_ATTEMPTS);
}
// ODPOWIEDŹ
{
  // ZŁE: x (nic nie znaczy), numberOfProducts... (za długa, szczegóły w nazwie),
  // logged (boolean bez przedrostka: "logged", ale co? Potrzebne is/has/should),
  // data (nie mówi jakie dane), user_name (snake_case, w JS !!camelCase!!),
  // getUser (czasownik, wygląda jak funkcja - błąd kardynalny),
  // titleBook (od szczegółu do ogółu, ma być bookTitle),
  // MAXloginAttempts (mieszanka stylów).
  //
  // DOBRE: activeUserCount, MAX_LOGIN_ATTEMPTS.
  //
  // Poprawki: x -> itemCount, logged -> isLoggedIn, data -> customerProfile,
  // numberOfProductsCurrentlyAvailableInMainWarehouse -> availableProductCount,
  // user_name -> userName, getUser -> userName, titleBook -> bookTitle,
  // MAXloginAttempts -> MAX_LOGIN_ATTEMPTS.
  //
  // user_name i getUser opisują to samo, więc obie schodzą do tej samej nazwy.
  //
  // Z najdłuższej nazwy wypada "CurrentlyAvailableInMainWarehouse", bo kontekst daje
  // moduł, w którym zmienna żyje - nazwa nie powtarza tego, co już wiadomo z otoczenia.
  // Wzorcem jest activeUserCount z tego samego bloku: przymiotnik + rzeczownik + Count.
  //
  // Reguła na stałe: UPPER_SNAKE tylko dla stałych konfiguracyjnych, czyli wpisanych
  // na sztywno progów i limitów sterujących zachowaniem programu (MAX_LOGIN_ATTEMPTS).
  // Cała reszta camelCase, nawet przy const i nawet gdy wartość się nie zmienia -
  // activeUserCount to zwykły wynik, a nie próg.
}

////////
//// 2. Nazewnictwo: popraw kod
////////

// Ten kod działa i wypisuje poprawny wynik, ale nie da się go czytać.
// Przepisz go tak, żeby każda nazwa mówiła, czym jest. Wynik ma zostać ten sam.
{
  const arr = [
    { n: "Laptop", p: 3499, s: true },
    { n: "Mouse", p: 129.99, s: false },
    { n: "Keyboard", p: 249, s: true },
  ];

  const f = (a) => a.filter((e) => e.s).map((e) => e.p);

  console.log(f(arr));
}
// ODPOWIEDŹ
{
  // [ 3499, 249 ]
  //
  // Nazwy jednoliterowe nie mówią nic, a skróty n, p, s trzeba za każdym razem
  // rozszyfrowywać z kontekstu. Wersja czytelna:
  //
  // const products = [{ name: "Laptop", pricePln: 3499, isInStock: true }, ...];
  // const getInStockPricesPln = (products) =>
  // products.filter((product) => product.isInStock).map((product) => product.pricePln);
  //
  // Boolean dostaje przedrostek is, cena jednostkę w nazwie, a parametr callbacka
  // nazywa się po dziedzinie, nie e ani x.
}

////////
//// 3. Typy
////////

// Wymień typy prymitywne. Ile ich jest? Co zwróci każde wywołanie?
{
  console.log(typeof 42);
  console.log(typeof "42");
  console.log(typeof null);
  console.log(typeof [1, 2, 3]);
  console.log(typeof NaN);
}
// ODPOWIEDŹ
{
  // "number", "string", "object", "object", "number"
  //
  // Prymitywów jest siedem: string, number, bigint, boolean, undefined, symbol, null.
  //
  // typeof null zwraca "object" przez błąd z 1995 roku, którego nigdy nie naprawiono.
  //
  // Tablica to obiekt, a NaN jest typu "number", bo to wynik operacji na liczbach.
}

////////
//// 4. var, let, const
////////

// Czym różni się var od let? Co wypisze ten kod, a co się stanie po odkomentowaniu?
{
  {
    var leakedValue = "var";
    let blockValue = "let";
  }

  console.log(leakedValue);
  // console.log(blockValue);
}
// ODPOWIEDŹ
{
  // var wycieka z bloku, let rzuca ReferenceError
  // var ma zakres funkcyjny, więc klamry go nie zatrzymują i wycieka na zewnątrz bloku.
  // Odkomentowany blockValue rzuci ReferenceError: blockValue is not defined.
}

////////
//// 5. Hoisting
////////

// Czy let i const też są hoistowane? Która linia zadziała, a która się wywali?
{
  console.log(typeof buildInvoiceNumber);
  // console.log(typeof buildReceiptNumber);

  function buildInvoiceNumber(orderNumber) {
    return `FV/2026/${orderNumber}`;
  }

  const buildReceiptNumber = (orderNumber) => `PAR/2026/${orderNumber}`;
}
// ODPOWIEDŹ
{
  // "function"; druga linia rzuci ReferenceError
  //
  // Deklaracja funkcji jest wciągana razem z ciałem, więc typeof widzi ją przed definicją.
  //
  // let i const też są hoistowane, ale trafiają do martwej strefy (TDZ - temporal dead zone),
  // więc typeof buildReceiptNumber rzuci
  // ReferenceError: Cannot access 'buildReceiptNumber' before initialization.
}

////////
//// 6. Porównania
////////

// Co zwróci każde porównanie i dlaczego?
{
  console.log(0 == "");
  console.log(null == undefined);
  console.log(NaN === NaN);
  console.log([] == false);
}
// ODPOWIEDŹ
{
  // true, true, false, true
  //
  // 0 == "" bo "" konwertuje się do 0. null == undefined to jedyna taka para w języku,
  // a null nie równa się już niczemu innemu. NaN nie równa się sobie z definicji IEEE 754.
  //
  // [] == false, bo [] idzie do "" i dalej do 0, a false też do 0.
}

////////
//// 7. Struktury danych
////////

// Kiedy tablica, kiedy obiekt, kiedy Set, a kiedy Map?
// Ile elementów będzie miał zbiór? W jakiej kolejności wypiszą się klucze?
{
  const visitedPages = new Set(["/start", "/cennik", "/start"]);

  console.log(visitedPages.size);

  const productNameByPosition = { 2: "Mouse", 1: "Laptop", 10: "Monitor" };

  console.log(Object.keys(productNameByPosition));
}
// ODPOWIEDŹ
{
  // 2  oraz  [ "1", "2", "10" ]
  //
  // Set usuwa duplikat "/start". Obiekt sam ustawia rosnąco klucze będące nieujemnymi
  // liczbami całkowitymi, niezależnie od kolejności wstawiania. Reszta, także "-1"
  // i "1.5", zostaje w kolejności wstawiania - to nie jest sortowanie wszystkiego,
  // co wygląda na liczbę.
  //
  // Map zachowuje kolejność wstawiania i przyjmuje klucze dowolnego typu (np. object),
  // i to jest główny powód, żeby po nią sięgnąć.
}

////////
//// 8. this
////////

// Od czego zależy this: od miejsca definicji czy wywołania?
// Trzy wywołania, a różne wyniki tylko dwa. Które wychodzą tak samo i dlaczego?
{
  const invoice = {
    numberText: "FV/2026/7",

    describeAsMethod() {
      return `Faktura ${this.numberText}`;
    },

    makeFv() {
      return () => `Faktura ${this.numberText}`;
    },

    describeAsArrow: () => `Faktura ${this.numberText}`,
  };

  console.log(invoice.describeAsMethod());
  console.log(invoice.makeFv()());
  console.log(invoice.describeAsArrow());
}
// ODPOWIEDŹ
{
  // "Faktura FV/2026/7", "Faktura FV/2026/7", "Faktura undefined"
  //
  // Tak samo wychodzą describeAsMethod i makeFv()(). Metoda wywołana przez kropkę dostaje
  // obiekt, a strzałka zwrócona z tej metody dziedziczy jej this, więc też widzi numberText.
  //
  // Odstaje describeAsArrow: ta strzałka stoi bezpośrednio w literale obiektu, a literał
  // nie tworzy zakresu this, więc bierze this z modułu, gdzie numberText nie ma.
  //
  // Dla zwykłych funkcji this zależy od miejsca WYWOŁANIA, dla strzałkowych od miejsca,
  // w którym powstały - i tego wywołanie już nie zmieni.
}

////////
//// 9. Falsy
////////

// Wymień wszystkie wartości falsy. Ile ich jest? Które przejdą przez warunek?
{
  const values = [0, "", "0", [], {}, null, NaN, "false"];

  values.forEach((value) => {
    if (value) {
      console.log(JSON.stringify(value));
    }
  });
}
// ODPOWIEDŹ
{
  // "0", [], {}, "false"
  //
  // Falsy jest osiem: false, 0, -0, 0n, "", null, undefined, NaN. W praktyce spotyka się
  // sześć, bo -0 i 0n trafiają się rzadko.
  //
  // Napis "0" i napis "false" są truthy, bo liczy się długość napisu, a nie jego treść.
  // Pusta tablica i pusty obiekt też są truthy, bo to obiekty.
}

////////
//// 10. Konwersje
////////

// Co wypisze każda linia? Rozpisz krok po kroku.
{
  console.log("10" + 5 - 3);
  console.log(1 + 2 + "3");
  console.log(Number(""));
  console.log(parseFloat("199,99"));
}
// ODPOWIEDŹ
{
  // 102, "33", 0, 199
  //
  // "10" + 5 daje "105", bo plus skłania się ku napisowi (konwersja do typu string).
  // Potem "105" - 3 daje 102, bo minus umie tylko liczby (konwersja jest do typu number).
  // 1 + 2 liczy się pierwsze i daje 3, dopiero potem 3 + "3" konwertuje do stringa.
  // Number("") to 0, nie NaN.
  // parseFloat urywa się na przecinku.
}

////////
//// 11. Co zwracają && i ||
////////

// Czy wynikiem jest zawsze true albo false? Co konkretnie wypisze każda linia?
{
  console.log(0 || "brak danych");
  console.log("Anna" && 42);
  console.log(null && "cokolwiek");
}
// ODPOWIEDŹ
{
  // "brak danych", 42, null
  //
  // Zwracają WARTOŚĆ operandu, nie boolean. || oddaje pierwszą truthy albo ostatnią,
  // && pierwszą falsy albo ostatnią.
}

////////
//// 12. ?? kontra ||
////////

// Czym się różnią? Na jakich danych dadzą inny wynik?
{
  const userDiscountPercent = 0;

  console.log(userDiscountPercent || 10);
  console.log(userDiscountPercent ?? 10);
}
// ODPOWIEDŹ
{
  // 10, 0
  //
  // || reaguje na wszystko falsy, więc zjada świadomie ustawione zero.
  //
  // ?? reaguje wyłącznie na null i undefined, więc 0 przechodzi nietknięte.
}

////////
//// 13. Optional chaining
////////

// Co wypisze ten kod? Czy ?. wystarczy, żeby uniknąć problemu?
{
  const guestOrder = { customer: null, items: [] };

  console.log(guestOrder.customer?.address?.city);
  console.log(guestOrder.items?.[0]?.pricePln * 2);
}
// ODPOWIEDŹ
{
  // undefined, NaN
  //
  // ?. chroni ODCZYT, nie chroni tego, co robisz z wynikiem.
}

////////
//// 14. switch
////////

// Czy switch porównuje przez == czy ===? Co zrobi brak break? Czy default musi być ostatni?
{
  const inputValue = "2";

  switch (inputValue) {
    case 2:
      console.log("dwa jako liczba");
    case "2":
      console.log("dwa jako tekst");
    default:
      console.log("nic nie pasowało");
  }
}
// ODPOWIEDŹ
{
  // "dwa jako tekst", "nic nie pasowało"
  //
  // switch porównuje przez ===, więc napis "2" nie trafia w case 2. Trafia w case "2",
  // a brak break przepuszcza wykonanie dalej, także do default.
  //
  // default nie musi stać na końcu: silnik najpierw sprawdza wszystkie case'y i dopiero
  // gdy żaden nie pasuje, skacze do default. Po skoku wykonanie leci dalej, jak przy braku break.
}

////////
//// 15. Kopiowanie obiektów
////////

// Co wypiszą dwie ostatnie linie i dlaczego?
{
  const settings = { theme: "dark", notifications: { email: true } };
  const settingsCopy = { ...settings };

  console.log(settingsCopy.notifications === settings.notifications);

  settingsCopy.theme = "light";
  settingsCopy.notifications.email = false;

  console.log(settings.theme, settings.notifications.email);
}
// ODPOWIEDŹ
{
  // true  oraz  dark false  (dwa argumenty: napis "dark" i boolean false)
  //
  // Spread kopiuje tylko pierwszy poziom. Pole notifications w kopii to ta sama
  // referencja co w oryginale, stąd pierwsze true. Zmiana theme dotyka wyłącznie kopii,
  // ale zmiana notifications.email zmienia też oryginał.
  //
  // 1 sposób: const settingsCopy = { ...settings, notifications: { ...settings.notifications } }.
  // 2 sposób: const settingsCopy = structuredClone(settings)
}
