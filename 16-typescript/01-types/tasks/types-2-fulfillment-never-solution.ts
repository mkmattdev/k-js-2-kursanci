////////
//// Blok 1, zadanie 2: etapy realizacji zamówienia, rozwiązanie
////////
{
  // Switch obsługuje każdy etap osobną gałęzią, więc do default nie da się dojść i etap ma
  // tam typ never. Piąty etap w unii zmienia to od razu: default staje się osiągalny,
  // a przypisanie do never przestaje się kompilować w obu funkcjach naraz.

  type FulfillmentStage = "placed" | "picking" | "packed" | "handedToCourier";

  const getNextStage = (stage: FulfillmentStage): FulfillmentStage => {
    switch (stage) {
      case "placed":
        return "picking";
      case "picking":
        return "packed";
      case "packed":
        return "handedToCourier";
      case "handedToCourier":
        throw new Error("Paczka jest już u kuriera, nie ma następnego etapu");
      default: {
        const unhandledStage: never = stage;

        throw new Error(`Nieobsłużony etap: ${String(unhandledStage)}`);
      }
    }
  };

  const isCancelableStage = (stage: FulfillmentStage): boolean => {
    switch (stage) {
      case "placed":
      case "picking":
        return true;
      case "packed":
      case "handedToCourier":
        return false;
      default: {
        const unhandledStage: never = stage;

        throw new Error(`Nieobsłużony etap: ${String(unhandledStage)}`);
      }
    }
  };

  // Błąd - TS2322 przy obu przypisaniach do never, gdy do unii dojdzie piąty etap
  // type FulfillmentStage = "placed" | "picking" | "packed" | "handedToCourier" | "delivered";

  //// Sprawdzenie

  console.log(getNextStage("placed"), getNextStage("picking"), getNextStage("packed"));
  // picking packed handedToCourier

  console.log(isCancelableStage("picking"), isCancelableStage("packed"));
  // true false

  try {
    getNextStage("handedToCourier");
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
  }
  // Paczka jest już u kuriera, nie ma następnego etapu
}
