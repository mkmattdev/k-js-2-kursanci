////////
//// Blok 2, zadanie 1: z callbacków na obietnice, a potem na async i await, rozwiązanie
////////
{
  // Opakowanie kroku w obietnicę to zawsze ten sam schemat: new Promise, a w środku
  // wywołanie starej funkcji, w którym błąd oddajemy przez reject, a wynik przez resolve.
  // Dalej łańcuch jest płaski, ponieważ każde .then zwraca obietnicę następnego kroku,
  // a jeden .catch na końcu obsługuje odrzucenie dowolnego ogniwa.
  // W wersji na await ten sam efekt daje jeden blok try/catch.

  const UNAVAILABLE_ORDER_ID = 999;

  const reserveStock = (orderId, onDone) =>
    setTimeout(() => {
      let error = null;
      if (orderId === UNAVAILABLE_ORDER_ID) {
        error = new Error("Brak towaru w magazynie");
      }
      onDone(error, "r_88");
    }, 200);

  const chargeCard = (reservationId, onDone) =>
    setTimeout(() => {
      let error = null;
      if (typeof reservationId !== "string") {
        error = new Error("Brak numeru rezerwacji");
      }
      onDone(error, "pay_12");
    }, 300);

  const createShipment = (paymentId, onDone) =>
    setTimeout(() => {
      let error = null;
      if (typeof paymentId !== "string") {
        error = new Error("Brak numeru płatności");
      }
      onDone(error, "PL123456789");
    }, 250);

  // Kod do przepisania.
  const finalizeOrderWithCallbacks = (orderId, onFinished) => {
    reserveStock(orderId, (reserveError, reservationId) => {
      if (reserveError) return onFinished(`Nie udało się: ${reserveError.message}`);

      chargeCard(reservationId, (chargeError, paymentId) => {
        if (chargeError) return onFinished(`Nie udało się: ${chargeError.message}`);

        createShipment(paymentId, (shipmentError, trackingNumber) => {
          if (shipmentError) return onFinished(`Nie udało się: ${shipmentError.message}`);

          onFinished(`Wysyłka ${trackingNumber}`);
        });
      });
    });
  };

  const reserveStockAsPromise = (orderId) =>
    new Promise((resolve, reject) => {
      reserveStock(orderId, (error, reservationId) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(reservationId);
      });
    });

  const chargeCardAsPromise = (reservationId) =>
    new Promise((resolve, reject) => {
      chargeCard(reservationId, (error, paymentId) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(paymentId);
      });
    });

  const createShipmentAsPromise = (paymentId) =>
    new Promise((resolve, reject) => {
      createShipment(paymentId, (error, trackingNumber) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(trackingNumber);
      });
    });

  const finalizeOrderWithPromises = (orderId) =>
    reserveStockAsPromise(orderId)
      .then((reservationId) => chargeCardAsPromise(reservationId))
      .then((paymentId) => createShipmentAsPromise(paymentId))
      .then((trackingNumber) => `Wysyłka ${trackingNumber}`)
      .catch((error) => `Nie udało się: ${error.message}`);

  const finalizeOrderWithAsync = async (orderId) => {
    try {
      const reservationId = await reserveStockAsPromise(orderId);
      const paymentId = await chargeCardAsPromise(reservationId);
      const trackingNumber = await createShipmentAsPromise(paymentId);

      return `Wysyłka ${trackingNumber}`;
    } catch (error) {
      return `Nie udało się: ${error.message}`;
    }
  };

  //// Sprawdzenie

  const check = async () => {
    console.log(await finalizeOrderWithPromises(7)); // Wysyłka PL123456789
    console.log(await finalizeOrderWithPromises(UNAVAILABLE_ORDER_ID));
    // Nie udało się: Brak towaru w magazynie
    console.log(await finalizeOrderWithAsync(7)); // Wysyłka PL123456789
    console.log(await finalizeOrderWithAsync(UNAVAILABLE_ORDER_ID));
    // Nie udało się: Brak towaru w magazynie
  };

  check();
}
