  const REQUIRED_ORDER_FIELDS = ["orderId", "customerEmail", "totalPln"];

  const parseOrder = (jsonText) => {
    let parsedOrder;

    parsedOrder = JSON.parse(jsonText);
    // try {
    //   parsedOrder = JSON.parse(jsonText);
    // } catch {
    //   throw new Error("Nie udało odczytać się zamówienia");
    // }

    for (const fieldName of REQUIRED_ORDER_FIELDS) {
      if (parsedOrder[fieldName] === undefined) {
        throw new Error(`Brak pola: ${fieldName}`);
      }
    }

    return parsedOrder;
  };

  //// Sprawdzenie

  // console.log(parseOrder('{"orderId":7,"customerEmail":"anna@example.com","totalPln":249}'));
  // ma być: { orderId: 7, customerEmail: 'anna@example.com', totalPln: 249 }

  try {
    parseOrder("uszkodzone dane");
    console.log("nie rzucił błędu");
  } catch (error) {
    console.log(error.name, "|", error.message);
  }