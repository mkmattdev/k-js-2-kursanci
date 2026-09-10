////////
//// Blok 2: Aliasy, pola opcjonalne, zawężanie, unie dyskryminowane i as
////////

////////
//// 1. Alias typu i interfejs
////////
{
  // Ten sam kształt zapisany dwoma sposobami. W tym zastosowaniu są wymienne.
  type OrderAlias = { orderId: number; totalPln: number };

  interface OrderInterface {
    orderId: number;
    totalPln: number;
  }

  const first: OrderAlias = { orderId: 1, totalPln: 249 };
  const second: OrderInterface = { orderId: 2, totalPln: 99 };

  console.log(first.totalPln + second.totalPln); // 348

  // Wniosek: do opisu obiektu są wymienne, bierz to, czego używa zespół. Alias musi
  // wejść tam, gdzie kształt nie jest obiektem, czyli przy unii i typie prostym.
}

////////
//// 2. Opcjonalne klucze, metody i parametry
////////
{
  // Znak zapytania znaczy w tych trzech miejscach to samo: tego może nie być. Za każdym
  // razem dokłada do typu undefined, więc kompilator wymusza policzenie się z brakiem.

  //// a) klucz obiektu

  type Order = {
    orderId: number;
    note?: string;
  };

  const rushOrder: Order = { orderId: 1, note: "zadzwonić przed dostawą" };
  const plainOrder: Order = { orderId: 2 };

  // ?. przerywa odczyt na undefined zamiast rzucać błędem, a ?? podstawia wartość zastępczą.
  console.log(rushOrder.note?.toUpperCase() ?? "bez uwag"); // ZADZWONIĆ PRZED DOSTAWĄ
  console.log(plainOrder.note?.toUpperCase() ?? "bez uwag"); // bez uwag

  //// b) parametr funkcji

  // W ciele funkcji parametr opcjonalny ma typ "liczba albo undefined", więc trzeba go
  // sprawdzić. Opcjonalne parametry stoją zawsze na końcu listy, bo inaczej nie dałoby się
  // ich pominąć przy wywołaniu.
  const formatPrice = (pricePln: number, discountPercent?: number) =>
    discountPercent === undefined
      ? `${pricePln} zł`
      : `${pricePln - (pricePln * discountPercent) / 100} zł`;

  console.log(formatPrice(100)); // 100 zł
  console.log(formatPrice(100, 10)); // 90 zł
}

////////
//// 3. Zawężanie, czyli skąd TypeScript wie, co trzyma
////////
{
  // Gdy wartość może być jednym z kilku typów, kompilator nie pozwoli na nic, co nie działa
  // dla wszystkich. Zawężanie to sprawdzenie, po którym wie już, z czym ma do czynienia.
  // Każdy sposób niżej to zwykły JavaScript, więc pilnuje danych także po uruchomieniu.

  //// a) typeof, dla typów prostych

  const describeId = (customerId: string | number) => {
    if (typeof customerId === "string") {
      return customerId.toUpperCase(); // od tej linii w dół customerId jest napisem
    }

    return customerId.toFixed(0); // a tu może być już tylko liczbą
  };

  console.log(describeId("ab-12")); // AB-12
  console.log(describeId(7)); // 7

  //// b) in, dla obiektów o różnych polach

  type PrivateCustomer = { name: string };
  type CompanyCustomer = { companyName: string; taxNumber: string };

  const describeCustomer = (customer: PrivateCustomer | CompanyCustomer) =>
    "taxNumber" in customer
      ? `${customer.companyName}, NIP ${customer.taxNumber}`
      : customer.name;

  console.log(describeCustomer({ name: "Anna" })); // Anna
  console.log(describeCustomer({ companyName: "Sklep", taxNumber: "123" })); // Sklep, NIP 123

  //// c) instanceof, dla instancji klasy

  // Date jest klasą, więc po sprawdzeniu wolno wywołać getFullYear. typeof dałoby "object".
  const describeDelivery = (deliveryDate: Date | string) =>
    deliveryDate instanceof Date
      ? `dostawa w ${deliveryDate.getFullYear()}`
      : deliveryDate;

  console.log(describeDelivery(new Date(2026, 8, 8))); // dostawa w 2026
  console.log(describeDelivery("wysyłka w 2 dni")); // wysyłka w 2 dni

  //// d) Array.isArray, dla tablic

  // Ten sam kod rabatowy bywa pojedynczym napisem albo listą.
  const describeCoupons = (couponCodes: string | string[]) =>
    Array.isArray(couponCodes) ? couponCodes.join(", ") : couponCodes;

  console.log(describeCoupons(["WIOSNA", "STUDENT"])); // WIOSNA, STUDENT
  console.log(describeCoupons("WIOSNA")); // WIOSNA
}

////////
//// 4. Unia dyskryminowana
////////
{
  // Każdy wariant dostaje to samo pole status, a w nim swoją nazwę. Wtedy nie trzeba
  // zgadywać po polach, jak przy in: wystarczy przeczytać status. To pole nazywamy
  // dyskryminatorem, a taką unię dyskryminowaną.
  type PaymentResult =
    | { status: "paid"; paidPln: number }
    | { status: "rejected"; reason: string }
    | { status: "pending"; retryInSeconds: number };

  const describePayment = (result: PaymentResult): string => {
    switch (result.status) {
      case "paid":
        return `Zapłacono ${result.paidPln} zł`;
      case "rejected":
        return `Odrzucono: ${result.reason}`;
      case "pending":
        return `Spróbujemy ponownie za ${result.retryInSeconds} s`;
    }
  };

  console.log(describePayment({ status: "paid", paidPln: 249 })); // Zapłacono 249 zł
  console.log(describePayment({ status: "rejected", reason: "Brak środków" })); // Odrzucono: Brak środków

  // Dwa zyski. W gałęzi "paid" wolno sięgnąć po paidPln, a po reason już nie, bo tego
  // pola w tym wariancie nie ma. I gdy do unii dojdzie czwarty wariant, a switch go
  // pominie, kompilator zgłosi błąd. Po to stoi tu jawny typ zwracany string: bez niego
  // funkcja po cichu zwróciłaby undefined.
}
