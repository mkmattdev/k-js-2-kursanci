////////
//// Blok 1: Obsługa błędów, zadania
////////

////////
//// Zadanie 1: odczyt zamówienia z JSON
////////
{
  // KONTEKST BIZNESOWY
  // Zamówienia przychodzą od partnera jako ciąg JSON i trafiają do naszej bazy. Zanim je
  // zapiszemy, trzeba je sparsować i sprawdzić, czy zawierają wszystkie wymagane pola.
  //
  // USER STORY
  // Jako magazynier chcę, żeby zamówienie bez kompletu danych nie trafiło do bazy,
  // aby nie realizować zamówienia, którego nie ma jak wysłać.
  //
  // KRYTERIA AKCEPTACJI
  // - parseOrder przyjmuje ciąg JSON i zwraca obiekt zamówienia
  // - jeżeli parsowanie się nie powiedzie, rzuca Error "Nie udało się odczytać zamówienia"
  // - jeżeli brakuje pola z REQUIRED_ORDER_FIELDS, rzuca Error "Brak pola: <nazwa>"
  // - wartość 0 w orderId albo totalPln jest poprawna i nie oznacza braku pola
  //
  // PRZYKŁADY WYWOŁANIA (pozostałe w sekcji Sprawdzenie)
  // 'uszkodzone dane'               ->  Error "Nie udało się odczytać zamówienia"
  // '{"orderId":7,"totalPln":249}'  ->  Error "Brak pola: customerEmail"

  const REQUIRED_ORDER_FIELDS = ["orderId", "customerEmail", "totalPln"];

  const parseOrder = (jsonText) => {
    // TODO: sparsuj ciąg JSON, a następnie sprawdź pola. W obu przypadkach rzuć Error.
  };

  //// Sprawdzenie

  console.log(parseOrder('{"orderId":7,"customerEmail":"anna@example.com","totalPln":249}'));
  // ma być: { orderId: 7, customerEmail: 'anna@example.com', totalPln: 249 }

  try {
    parseOrder("uszkodzone dane");
    console.log("nie rzucił błędu");
  } catch (error) {
    console.log(error.name, "|", error.message);
  }
  // ma być: Error | Nie udało się odczytać zamówienia

  try {
    parseOrder('{"orderId":7,"totalPln":249}');
    console.log("nie rzucił błędu");
  } catch (error) {
    console.log(error.name, "|", error.message);
  }
  // ma być: Error | Brak pola: customerEmail

  try {
    parseOrder('{"customerEmail":"anna@example.com","totalPln":249}');
    console.log("nie rzucił błędu");
  } catch (error) {
    console.log(error.name, "|", error.message);
  }
  // ma być: Error | Brak pola: orderId

  console.log(parseOrder('{"orderId":0,"customerEmail":"anna@example.com","totalPln":0}'));
  // ma być: { orderId: 0, customerEmail: 'anna@example.com', totalPln: 0 }
}

////////
//// Zadanie 2: co pokazać klientowi, a co oddać dalej
////////
{
  // KONTEKST BIZNESOWY
  // Zamówienie klienta przechodzi przez sprawdzenie stanu magazynowego, a następnie przez
  // zapis do bazy. Pierwszy krok zawodzi z powodu danych klienta, drugi z powodu awarii
  // po naszej stronie.
  //
  // USER STORY
  // Jako klient chcę zobaczyć, że mam zamówić mniej sztuk, gdy przekroczyłem stan magazynu,
  // aby wiedzieć, co poprawić, zamiast oglądać komunikat o awarii, na którą nie mam wpływu.
  //
  // KRYTERIA AKCEPTACJI
  // - OrderError dziedziczy po Error, a jego właściwość name ma wartość "OrderError"
  // - handleCheckout przekazuje zamówienie do checkStock, a następnie do saveOrder
  // - jeżeli zostanie rzucony OrderError, zwraca "Popraw zamówienie: <komunikat>"
  // - typ błędu rozpoznajesz przez instanceof, a nie przez error.name
  // - każdy inny błąd zostaje przekazany dalej, poza handleCheckout
  // - checkStock i saveOrder są gotowe, nie zmieniamy ich
  //
  // PRZYKŁADY WYWOŁANIA (pozostałe w sekcji Sprawdzenie)
  // { orderId: 7, quantity: 2, totalPln: 249 }   ->  "Przyjęto zamówienie 7"
  // { orderId: 7, quantity: 99, totalPln: 249 }
  //     ->  "Popraw zamówienie: Zamówiono 99 szt., na stanie 3"

  const AVAILABLE_QUANTITY = 3;

  // TODO: napisz klasę OrderError dziedziczącą po Error, z name ustawionym na "OrderError"

  // Gotowe. Zbyt duża zamówiona ilość jest błędem po stronie klienta.
  const checkStock = (order) => {
    if (order.quantity > AVAILABLE_QUANTITY) {
      throw new OrderError(`Zamówiono ${order.quantity} szt., na stanie ${AVAILABLE_QUANTITY}`);
    }

    return order;
  };

  // Gotowe. Zapis do bazy. Kwota 0 zł oznacza błąd po stronie sklepu, ponieważ takie
  // zamówienie nie powinno tu dotrzeć.
  const saveOrder = (order) => {
    if (order.totalPln <= 0) {
      throw new RangeError("Kwota zamówienia musi być dodatnia");
    }

    return `Przyjęto zamówienie ${order.orderId}`;
  };

  const handleCheckout = (order) => {
    // TODO: obsłuż OrderError komunikatem dla klienta, pozostałe błędy przekaż dalej
  };

  //// Sprawdzenie

  try {
    checkStock({ orderId: 7, quantity: 99, totalPln: 249 });
    console.log("brak rzuconego błędu");
  } catch (error) {
    console.log(error.name, "|", error.message, "|", error instanceof Error);
  }
  // ma być: OrderError | Zamówiono 99 szt., na stanie 3 | true

  console.log(handleCheckout({ orderId: 7, quantity: 2, totalPln: 249 }));
  // ma być: Przyjęto zamówienie 7

  console.log(handleCheckout({ orderId: 7, quantity: 99, totalPln: 249 }));
  // ma być: Popraw zamówienie: Zamówiono 99 szt., na stanie 3

  try {
    handleCheckout({ orderId: 7, quantity: 2, totalPln: 0 });
    console.log("brak rzuconego błędu");
  } catch (error) {
    console.log(error.name, "|", error.message);
  }
  // ma być: RangeError | Kwota zamówienia musi być dodatnia
}
