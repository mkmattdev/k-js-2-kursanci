////////
//// Blok 1: Obsługa błędów, rozwiązania
////////

////////
//// Zadanie 1: odczyt zamówienia z JSON
////////
{
  // Blok try obejmuje wyłącznie JSON.parse. Gdyby obejmował także pętlę, błąd o brakującym
  // polu zostałby złapany przez ten sam catch i zgłoszony jako "Nie udało się odczytać
  // zamówienia". Pole sprawdzamy przez === undefined, ponieważ zapis !parsedOrder[fieldName]
  // odrzuciłby zamówienie na kwotę 0 zł, gdyż wartość 0 jest falsy.

  const REQUIRED_ORDER_FIELDS = ["orderId", "customerEmail", "totalPln"];

  const parseOrder = (jsonText) => {
    let parsedOrder;

    try {
      parsedOrder = JSON.parse(jsonText);
    } catch {
      throw new Error("Nie udało się odczytać zamówienia");
    }

    for (const fieldName of REQUIRED_ORDER_FIELDS) {
      if (parsedOrder[fieldName] === undefined) {
        throw new Error(`Brak pola: ${fieldName}`);
      }
    }

    return parsedOrder;
  };

  //// Sprawdzenie

  console.log(parseOrder('{"orderId":7,"customerEmail":"anna@example.com","totalPln":249}'));
  // { orderId: 7, customerEmail: 'anna@example.com', totalPln: 249 }

  try {
    parseOrder("uszkodzone dane");
    console.log("nie rzucił błędu");
  } catch (error) {
    console.log(error.name, "|", error.message);
  }
  // Error | Nie udało się odczytać zamówienia

  try {
    parseOrder('{"orderId":7,"totalPln":249}');
    console.log("nie rzucił błędu");
  } catch (error) {
    console.log(error.name, "|", error.message);
  }
  // Error | Brak pola: customerEmail

  try {
    parseOrder('{"customerEmail":"anna@example.com","totalPln":249}');
    console.log("nie rzucił błędu");
  } catch (error) {
    console.log(error.name, "|", error.message);
  }
  // Error | Brak pola: orderId

  console.log(parseOrder('{"orderId":0,"customerEmail":"anna@example.com","totalPln":0}'));
  // { orderId: 0, customerEmail: 'anna@example.com', totalPln: 0 }
}

////////
//// Zadanie 2: co pokazać klientowi, a co oddać dalej
////////
{
  // Najważniejszy jest throw error stojący po instrukcji if. Bez niego catch zwróciłby klientowi
  // "Popraw zamówienie: Kwota zamówienia musi być dodatnia", czyli zgłosiłby mu jako jego błąd
  // awarię po stronie sklepu. Typ sprawdzamy przez instanceof, a nie przez
  // error.name === "OrderError", ponieważ name jest zwykłym napisem i można go nadpisać.

  const AVAILABLE_QUANTITY = 3;

  class OrderError extends Error {
    constructor(message) {
      super(message);
      this.name = "OrderError";
    }
  }

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
    try {
      return saveOrder(checkStock(order));
    } catch (error) {
      if (error instanceof OrderError) {
        return `Popraw zamówienie: ${error.message}`;
      }

      throw error;
    }
  };

  //// Sprawdzenie

  try {
    checkStock({ orderId: 7, quantity: 99, totalPln: 249 });
    console.log("brak rzuconego błędu");
  } catch (error) {
    console.log(error.name, "|", error.message, "|", error instanceof Error);
  }
  // OrderError | Zamówiono 99 szt., na stanie 3 | true

  console.log(handleCheckout({ orderId: 7, quantity: 2, totalPln: 249 }));
  // Przyjęto zamówienie 7

  console.log(handleCheckout({ orderId: 7, quantity: 99, totalPln: 249 }));
  // Popraw zamówienie: Zamówiono 99 szt., na stanie 3

  try {
    handleCheckout({ orderId: 7, quantity: 2, totalPln: 0 });
    console.log("brak rzuconego błędu");
  } catch (error) {
    console.log(error.name, "|", error.message);
  }
  // RangeError | Kwota zamówienia musi być dodatnia
}
