////////
//// Blok 1: Obsługa błędów
////////

////////
//// WPROWADZENIE: skąd się biorą błędy
////////
//
// Program może się zepsuć na trzy sposoby, a w tym bloku walczymy tylko z jednym z nich.
//
//  1. BŁĄD SKŁADNI. Kod nie jest poprawnym JavaScriptem, więc nie uruchomi się WCALE.
//     Silnik odrzuca cały plik, zanim wykona pierwszą linię:
//
//       const pricePln = (100 + ;
//
//     Niedomknięty nawias psuje też te linie, które są nad nim. try/catch nic tu nie da,
//     bo żeby try zadziałał, plik musi najpierw ruszyć.
//
//  2. BŁĄD WYKONANIA, po angielsku runtime error. Kod jest składniowo poprawny, rusza
//     i wywala się w trakcie: na konkretnej linii i na konkretnych danych.
//
//       const orders = [{ totalPln: 249 }];
//       orders[5].totalPln
//
//     orders[5] to undefined, więc odczyt pola wywala TypeError. Ten sam kod na
//     orders[0] działa. To jest jedyny rodzaj, który try/catch potrafi złapać,
//     i o nim jest ten blok.
//
//  3. BŁĄD LOGICZNY. Kod rusza, nie wywala się, wypisuje wynik, tylko wynik jest zły.
//
//       const grossPricePln = 100 * 1.23 * 1.23;
//
//     151.29 zamiast 123, VAT doliczony dwa razy. Tu nie ma czego łapać: od tego są
//     testy i review.
//
// Błąd wykonania ktoś musi rzucić. Raz robi to silnik: odczyt pola na undefined
// to TypeError. Innym razem robimy to my przez throw, gdy silnik milczy (z jego punktu widzenia wszystko jest OK), a biznes nie.
//
// Skąd się biorą błędy wykonania? Prawie zawsze z GRANICY programu, czyli stamtąd,
// gdzie wchodzą do niego dane spoza naszej kontroli:
//
//   - odpowiedź z API, plik albo baza, czyli coś, co może nie przyjść albo przyjść w innej postaci
//   - to, co wpisał użytkownik, czyli tekst, który miał być liczbą
//   - JSON z zewnątrz, który na przykład miał mieć pole email, a nie ma
//
// W środku własnej funkcji, na własnych danych, błędy wykonania zdarzają się rzadko.
// Dlatego try/catch stawiamy na granicy, a nie wszędzie.
//
// Po co je w ogóle obsługiwać, skoro program mógłby po prostu paść? Bo padnięcie
// jest decyzją. Czasem najlepszą: lepiej, żeby program przestał działać, niż zapisać do bazy złe lub niepełne dane.
// Czasem jest jednak decyzją najgorszą: jeden zepsuty kafelek / fragment nie może wygasić całej strony.

////////
//// 1. Trzy rodzaje błędów na żywo
////////
{
  // BŁĄD SKŁADNI
  // Po odkomentowaniu: SyntaxError i nie wykona się NIC, także linie stojące wyżej
  // const brokenPricePln = (100 + ;

  // BŁĄD WYKONANIA
  // Plik rusza normalnie i wywala się dopiero tutaj, na tych danych.
  const orders = [{ totalPln: 249 }];

  try {
    console.log(orders[5].totalPln);
  } catch (error) {
    console.log(error.name); // "TypeError", bo orders[5] to undefined
  }

  // BŁĄD LOGICZNY
  // Nic się nie psuje, program kończy się sukcesem, tylko wynik jest zły.
  const VAT_RATE = 0.23;
  const netPricePln = 100;
  const grossPricePln = netPricePln * (1 + VAT_RATE) * (1 + VAT_RATE);

  console.log(grossPricePln); // 151.29 zamiast 123, a żaden catch tego nie zauważy
}

////////
//// 2. JS rzuca sam błąd
////////
{
  // Silnik sam zbudował obiekt błędu i go rzucił, bo próbowaliśmy odczytwać pole, które zawiera null.
  const order = null;

  try {
    console.log(order.customerName);
  } catch (error) {
    console.log(error.name); // "TypeError"
  }

  // JSON.parse - błąd z tego też rzuca silnik JS.
  try {
    JSON.parse("{ to nie jest json }");
  } catch (error) {
    console.log(error.name); // "SyntaxError", bo rzucił parser, a nie my
    console.log(error instanceof SyntaxError); // true
    console.log(error instanceof Error); // true, SyntaxError dziedziczy po Error
  }
}

////////
//// 3. throw, czyli to my rzucamy błąd (a nie silnik JS!)
////////
{
  // JS przez zero nie rzuca błędu. Z punktu widzenia silnika to poprawny wynik.
  console.log(100 / 0); // Infinity

  // Na fakturze Infinity nie przejdzie, więc rzucamy sami.
  const splitInvoice = (invoiceTotalPln, guestCount) => {
    if (guestCount === 0) {
      throw new Error("Nie da się podzielić rachunku na zero gości");
    }

    return invoiceTotalPln / guestCount;
  };

  console.log(splitInvoice(240, 4)); // 60

  try {
    console.log(splitInvoice(240, 0));
  } catch (error) {
    console.log(error.message); // "Nie da się podzielić rachunku na zero gości"
  }

  const MIN_ORDER_VALUE_PLN = 50;

  const acceptOrder = (orderValuePln) => {
    if (orderValuePln < MIN_ORDER_VALUE_PLN) {
      throw new Error(`Zamówienie poniżej progu ${MIN_ORDER_VALUE_PLN} zł`);
    }

    return `Przyjęto zamówienie na ${orderValuePln} zł`;
  };

  console.log(acceptOrder(120)); // "Przyjęto zamówienie na 120 zł"

  // Bez try/catch ta sama linia przerwałaby cały program w tym miejscu.
  try {
    console.log(acceptOrder(30));
  } catch (error) {
    console.log(error.message); // "Zamówienie poniżej progu 50 zł"
  }

  console.log("Program leci dalej"); // "Program leci dalej"
}

////////
//// 4. Co siedzi w obiekcie błędu
////////
{
  const orderError = new Error("Nie udało się zapisać zamówienia");

  console.log(orderError.name); // "Error"
  console.log(orderError.message); // "Nie udało się zapisać zamówienia"
  console.log(orderError.stack.split("\n")[1]); // linia z plikiem i numerem

  // Z obiektu błędu odczytujesz trzy rzeczy:
  //   name    - jaki to błąd. Trafia do logów i do instanceof.
  //   message - co się stało. To czytasz ty, a czasem także klient.
  //   stack   - gdzie się stało. Tylko do debugowania, nie na ekran.
}

////////
//// 5. finally, czyli kod, który wykona się zawsze
////////
{
  const readPaymentStatus = (paymentId) => {
    try {
      if (paymentId === "p_broken") {
        throw new Error("Płatność nie istnieje");
      }

      return "PAID";
    } catch (error) {
      return `BŁĄD: ${error.message}`;
    } finally {
      // Wykona się w obu przebiegach, także wtedy, gdy try kończy się na return.
      console.log(`Zamykam sesję ${paymentId}`);
    }
  };

  console.log(readPaymentStatus("p_1")); // "Zamykam sesję p_1", a potem "PAID"
  console.log(readPaymentStatus("p_broken")); // "Zamykam sesję p_broken", potem "BŁĄD: Płatność nie istnieje"
}

////////
//// 6. Własny typ błędu
////////
{
  // class ... extends Error - nasz typ dziedziczy wszystko, co ma Error.
  // constructor  - wykonuje się przy new ValidationError(...).
  // super(...)   - wywołanie konstruktora Error, ustawia message i stack.
  // new.target   - klasa, która stanęła po new, więc nazwa trzyma się też przy dziedziczeniu.
  class ValidationError extends Error {
    constructor(message, fieldName) {
      super(message);
      this.name = new.target.name;
      this.fieldName = fieldName;
    }
  }

  const validateCustomer = (customer) => {
    if (!customer.email) {
      throw new ValidationError("Adres e-mail jest wymagany", "email");
    }

    return true;
  };

  try {
    validateCustomer({ name: "Anna" });
  } catch (error) {
    console.log(error.name); // "ValidationError"
    console.log(error.message); // "Adres e-mail jest wymagany"
    console.log(error.fieldName); // "email", własne pole niesie kontekst do formularza
    console.log(error instanceof ValidationError); // true
    console.log(error instanceof Error); // true
  }
}

////////
//// 7. Rethrow, czyli obsłuż swoje, resztę przekaż wyżej
////////
{
  class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = new.target.name;
    }
  }

  const saveCustomer = (customer) => {
    if (!customer.email) {
      throw new ValidationError("Adres e-mail jest wymagany");
    }

    // Literówka w nazwie: ta linia rzuci ReferenceError, czyli coś zupełnie innego.
    return databse.insert(customer);
  };

  const handleFormSubmit = (customer) => {
    try {
      return saveCustomer(customer);
    } catch (error) {
      if (error instanceof ValidationError) {
        return `Popraw formularz: ${error.message}`;
      }

      // Tego nie umiemy obsłużyć, więc oddajemy wyżej zamiast udawać, że wszystko gra.
      throw error;
    }
  };

  console.log(handleFormSubmit({ name: "Anna" })); // "Popraw formularz: Adres e-mail jest wymagany"

  try {
    handleFormSubmit({ name: "Anna", email: "anna@example.com" });
  } catch (error) {
    console.log(error.name); // "ReferenceError", literówka wyszła z funkcji nietknięta
  }

  // Bez rethrow ten sam catch odpowiedziałby "Popraw formularz: databse is not defined",
  // czyli zrzucił winę za literówkę na użytkownika.
}

////////
//// PUŁAPKA 1: return w finally przesłania wszystko
////////
// Błędnie: instrukcja return w bloku finally zwraca komunikat czynności końcowych
// zamiast wyjątku, więc informacja o braku towaru przepada.
{
  const AVAILABLE_QUANTITY = 3;

  const reserveStock = (orderedQuantity) => {
    console.log("Blokuję magazyn"); // "Blokuję magazyn"

    try {
      if (orderedQuantity > AVAILABLE_QUANTITY) {
        throw new Error(`Brak towaru, zamówiono ${orderedQuantity}, jest ${AVAILABLE_QUANTITY}`);
      }

      return `Zarezerwowano ${orderedQuantity} szt.`;
    } finally {
      console.log("Odblokowuję magazyn"); // "Odblokowuję magazyn"
      return "Magazyn odblokowany";
    }
  };

  try {
    console.log(reserveStock(10)); // "Magazyn odblokowany", a towaru nie zarezerwowano
  } catch (error) {
    console.log(error.message);
  }

  // Poprawnie: finally tylko sprząta. Wyjątek leci dalej.
  const reserveStockSafely = (orderedQuantity) => {
    console.log("Blokuję magazyn"); // "Blokuję magazyn"

    try {
      if (orderedQuantity > AVAILABLE_QUANTITY) {
        throw new Error(`Brak towaru, zamówiono ${orderedQuantity}, jest ${AVAILABLE_QUANTITY}`);
      }

      return `Zarezerwowano ${orderedQuantity} szt.`;
    } finally {
      console.log("Odblokowuję magazyn"); // "Odblokowuję magazyn"
    }
  };

  try {
    console.log(reserveStockSafely(10));
  } catch (error) {
    console.log(error.message); // "Brak towaru, zamówiono 10, jest 3"
  }
}

////////
//// PUŁAPKA 2: pusty catch, czyli błąd połknięty
////////
// Błędnie: funkcja zwraca 0, więc wywołujący nie odróżni pustego koszyka od awarii.
{
  const readCartTotalPln = (jsonText) => {
    try {
      return JSON.parse(jsonText).totalPln;
    } catch (error) {
      return 0;
    }
  };

  console.log(readCartTotalPln('{"totalPln": 249}')); // 249
  console.log(readCartTotalPln("uszkodzone dane")); // 0, a przecież nie ma koszyków za 0 zł

  // Poprawnie: funkcja nie zgaduje za wywołującego, tylko oddaje błąd wyżej razem z przyczyną.
  const readCartTotalPlnStrictly = (jsonText) => {
    try {
      return JSON.parse(jsonText).totalPln;
    } catch (error) {
      // cause trzyma błąd z JSON.parse, żeby nie zginął pod nowym komunikatem.
      throw new Error("Nie udało się odczytać koszyka", { cause: error });
    }
  };

  try {
    readCartTotalPlnStrictly("uszkodzone dane");
  } catch (error) {
    console.log(error.message); // "Nie udało się odczytać koszyka"
    console.log(error.cause.name); // "SyntaxError", oryginalna przyczyna nie przepadła
  }
}

////////
//// WIEDZA W PIGUŁCE
////////
//
//  1. Błąd wykonania rzuca albo JS, albo my.
//     JS sam, gdy silnik nie umie wykonać
//     linii: TypeError, SyntaxError, ReferenceError i inne wbudowane.
//     My: throw, także gdy silnik milczy: 100 / 0 to Infinity.
//
//  2. throw przerywa funkcję natychmiast, tak jak return. Wykonanie skacze
//     do najbliższego catch w górę stosu wywołań. Gdy po drodze nie ma żadnego, program
//     kończy działanie ("wywala się").
//
//  3. try obejmuje kod, który może rzucić, catch dostaje obiekt błędu, a finally wykonuje się
//     ZAWSZE: po sukcesie, po błędzie i po return.
//
//  4. throw przyjmuje cokolwiek, ale rzucamy instancje Error i klas, które po nim
//     dziedziczą. throw "tekst" nie ma message ani stack.
//
//  5. Obiekt błędu niesie trzy rzeczy do odczytania: name (jaki to błąd), message (co się
//     stało) i stack (gdzie).
//
//  6. instanceof rozpoznaje typ błędu i decyduje, czy umiemy go obsłużyć. Czego nie umiemy,
//     rzucamy dalej przez throw error, i to jest rethrow. catch łapie WSZYSTKO z bloku try.
//
//  PUŁAPKA 1: return w finally przesłania wszystko, także rzucony wyjątek. Błąd znika bez śladu.
//
//  PUŁAPKA 2: pusty catch połyka błąd, a funkcja melduje sukces na niepoprawnych danych.
