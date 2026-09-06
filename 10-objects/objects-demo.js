////////
//// Blok 10: Obiekty
////////

////////
//// WIEDZA W PIGUŁCE
////////
//
//  1. Do stałej nazwy klucza kropka, do nazwy siedzącej w ZMIENNEJ nawias kwadratowy.
//
//  2. Object.keys, Object.values i Object.entries to trzy sposoby przejścia po obiekcie.
//     entries oddaje pary [klucz, wartość], a Object.fromEntries składa z par obiekt
//     z powrotem. Parą entries i fromEntries przepuszcza się obiekt przez metody tablicowe z bloku 11.
//
//  3. Spread przepisuje pary klucz-wartość do NOWEGO obiektu. Przy kolizji wygrywa ten
//     po PRAWEJ, więc ustawienia użytkownika stawiamy ZA domyślnymi, nigdy przed.
//
//  4. Destrukturyzacja wyciąga pola do osobnych nazw. Wartość domyślna wchodzi
//     WYŁĄCZNIE dla undefined, nie dla null.
//
//  5. Rest w destrukturyzacji zbiera całą resztę kluczy do nowego obiektu. Tak odcina się
//     pole, którego nie chcemy pokazywać.
//
//  6. Metoda to funkcja w obiekcie, zapisana skrótem nazwa() { ... }.
//     this wskazuje obiekt stojący PRZED KROPKĄ w momencie wywołania.
//
//  PUŁAPKA 1: spread kopiuje tylko pierwszy poziom, więc zagnieżdżony obiekt zostaje wspólny.
//
//  PUŁAPKA 2: strzałkowa nie ma własnego this, więc nie nadaje się na metodę.
//
// Niżej to samo na żywo. Odpal: node objects-demo.js

//// 1. Tworzenie i odczyt
{
  const product = { name: "Laptop", pricePln: 3499 };
  product.isInStock = true;

  console.log(product.name); // "Laptop"
  console.log(product.isInStock); // true

  const keyName = "pricePln";
  console.log(product[keyName]); // 3499
  console.log(product.keyName); // undefined, kropka szuka klucza o nazwie "keyName"

  const currencyCode = "eur";
  console.log({ [currencyCode]: 4.27 }); // { eur: 4.27 }
}

//// 2. Object.keys, values i entries
{
  const stockByProduct = { laptop: 3, mouse: 12, keyboard: 0 };

  console.log(Object.keys(stockByProduct)); // [ 'laptop', 'mouse', 'keyboard' ]
  console.log(Object.values(stockByProduct)); // [ 3, 12, 0 ]
  console.log(Object.entries(stockByProduct)[0]); // [ 'laptop', 3 ]

  // fromEntries idzie w drugą stronę: z tablicy par składa obiekt.
  const restockedEntries = [
    ["laptop", 5],
    ["mouse", 12],
  ];

  console.log(Object.fromEntries(restockedEntries)); // { laptop: 5, mouse: 12 }
}

//// 3. Spread: kopiowanie i łączenie
{
  const defaultSettings = { theme: "light", language: "pl", fontSizePx: 14 };
  const userSettings = { theme: "dark" };

  console.log({ ...defaultSettings, ...userSettings });
  // { theme: 'dark', language: 'pl', fontSizePx: 14 }
  console.log({ ...userSettings, ...defaultSettings }.theme); // "light", domyślne skasowały wybór
}

//// 4. Destrukturyzacja
{
  const apiUser = { name: "Mateusz", nickname: null, passwordHash: "9f2b71c" };
  const { name, isAdult = false, nickname = "Anonim" } = apiUser;

  console.log(name); // "Mateusz"
  console.log(isAdult); // false, klucza w obiekcie nie ma, więc wchodzi wartość domyślna
  console.log(nickname); // null, bo wartość domyślna wchodzi WYŁĄCZNIE dla undefined

  const { passwordHash, ...publicProfile } = apiUser;
  console.log(Object.keys(publicProfile)); // [ 'name', 'nickname' ]
}

//// 5. Metody i this
{
  const book = {
    title: "Rok 1984",
    getTitle() {
      return this.title;
    },
  };

  console.log(book.getTitle()); // "Rok 1984"
}

//// PUŁAPKA 1: spread kopiuje tylko pierwszy poziom
// KONTRPRZYKŁAD: wartością klucza contact jest ADRES obiektu, więc kopia i oryginał
// mają ten sam contact i zmiana miasta przecieka do oryginału
{
  const attendee = { firstName: "Anna", contact: { city: "Warszawa" } };
  const shallowCopy = { ...attendee };

  shallowCopy.firstName = "Bartek";
  shallowCopy.contact.city = "Gdańsk";

  console.log(attendee); // { firstName: 'Anna', contact: { city: 'Gdańsk' } }
  // Pole płaskie przetrwało, miasto nie. Object.assign({}, attendee) zachowuje się tak samo.
}

{
  const attendee = { firstName: "Anna", contact: { city: "Warszawa" } };

  // Lekarstwo: spread na KAŻDYM poziomie, który zamierzamy ruszać. Przy głębszych
  // strukturach jest structuredClone, kopiujący przez wartość na każdym poziomie.
  const safeCopy = { ...attendee, contact: { ...attendee.contact, city: "Poznań" } };

  console.log(attendee.contact.city, safeCopy.contact.city); // "Warszawa" "Poznań"
}

//// PUŁAPKA 2: strzałkowa nie nadaje się na metodę
// KONTRPRZYKŁAD: strzałkowa bierze this z miejsca NAPISANIA, czyli z zakresu modułu,
// a nie z obiektu, w którym stoi
{
  const book = {
    title: "Rok 1984",
    getTitle: () => this.title,
  };

  console.log(book.getTitle()); // undefined

  // Dlatego metoda obiektu to zapis skrócony getTitle() { ... }, nigdy strzałkowa.
}
