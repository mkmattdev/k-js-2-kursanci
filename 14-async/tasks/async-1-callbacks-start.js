////////
//// Blok 2, zadanie 1: z callbacków na obietnice, a potem na async i await
////////
{
  // KONTEKST KOMERCYJNY
  // Finalizacja zamówienia to trzy kroki po kolei: rezerwacja towaru, obciążenie karty
  // i zamówienie kuriera. Magazyn i płatności mają API oparte na callbackach.
  //
  // CO MASZ ZROBIĆ
  // Przepisz finalizeOrderWithCallbacks dwa razy, na te same trzy kroki:
  //   a) finalizeOrderWithPromises, łańcuchem .then z jednym .catch, bez async i await
  //   b) finalizeOrderWithAsync, na await z jednym try/catch

  // Po sukcesie wypisz "Wysyłka <trackingNumber>", po porażce "Nie udało się: <komunikat>".
  // Trzy funkcje kroków są gotowe, nie zmieniamy ich.
  //
  // MA DZIAŁAĆ TAK
  // finalizeOrderWithPromises(7)    ->  "Wysyłka PL123456789"
  // finalizeOrderWithPromises(999)  ->  "Nie udało się: Brak towaru w magazynie"

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

  // a) TODO: OBIETNICE
  // Najpierw opakuj każdy z trzech kroków w obietnicę: reserveStockAsPromise,
  // chargeCardAsPromise i createShipmentAsPromise.
  //
  const reserveStockAsPromise = (orderId) => {
    // TODO: new Promise, a w środku wywołanie reserveStock. Błąd oddaj przez reject,
    // wynik przez resolve.
  };

  const chargeCardAsPromise = (reservationId) => {
    // TODO: analogicznie — chargeCard, reject przy błędzie, resolve przy wyniku.
  };

  const createShipmentAsPromise = (paymentId) => {
    // TODO: analogicznie — createShipment, reject przy błędzie, resolve przy wyniku.
  };

  const finalizeOrderWithPromises = (orderId) => {
    // TODO: połącz trzy kroki łańcuchem .then i zakończ jednym .catch
  };

  // b) ASYNC I AWAIT
  const finalizeOrderWithAsync = async (orderId) => {
    // TODO: te same trzy kroki na await, z jednym try/catch
  };

  /////////////////
  //// Sprawdzenie
  ////////////////

  // OBECNIE (callbacks):
  // Punkt wyjścia. Ta funkcja nic nie zwraca, więc nie ma tu czego awaitować:
  // wynik odbieramy drugim argumentem, czyli callbackiem.
  finalizeOrderWithCallbacks(7, (message) => console.log(message)); // Wysyłka PL123456789

  const check = async () => {
    // OCZEKIWANE - obietnice:
    // console.log(await finalizeOrderWithPromises(7)); // ma być: Wysyłka PL123456789
    // console.log(await finalizeOrderWithPromises(UNAVAILABLE_ORDER_ID)); // ma być: Nie udało się: Brak towaru w magazynie
    //
    // OCZEKIWANE - async / await:
    // console.log(await finalizeOrderWithAsync(7)); // ma być: Wysyłka PL123456789
    // console.log(await finalizeOrderWithAsync(UNAVAILABLE_ORDER_ID)); // ma być: Nie udało się: Brak towaru w magazynie
  };

  check();
}
