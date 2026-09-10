////////
//// Blok 2: Aliasy, pola opcjonalne, zawężanie, unie dyskryminowane i as
////////

////////
//// 1. Alias typu i interfejs
////////
{
  type OrderAlias = {
    orderId: number;
    totalPln?: number;
    isShipped?: boolean;
  };

  interface OrderInterface {
    orderId: number;
    totalPln: number;
    isShipped: boolean;
  }

  const firstOrder: OrderInterface = {
    orderId: 50,
    totalPln: 200,
    isShipped: true,
  };

  const secondOrder: OrderAlias = {
    orderId: 100,
  };

  console.log(firstOrder.totalPln + secondOrder.totalPln);

  // Wniosek: do opisu obiektu są wymienne, bierz to, czego używa zespół. Alias musi
  // wejść tam, gdzie kształt nie jest obiektem, czyli przy unii i typie prostym.
}

////////
//// 2. Opcjonalne klucze, metody i parametry
////////
{
  // Znak zapytania znaczy - tego może nie być.

  //// a) klucz obiektu

  type Order = {
    orderId: number;
    note?: string;
  };

  const firstOrder: Order = {
    orderId: 10,
    note: "Fast delivery",
  };

  const secondOrder: Order = {
    orderId: 11,
  };

  const thirdOrder: Order = {
    orderId: 15,
    note: "High priority",
  };

  console.log(firstOrder.note?.toUpperCase() ?? "Without any notes"); // ?. -> optional chaining, ?? - nullish

  const formatPrice = (pricePln: number, discountPercent?: number) => {
    // wersja A - ternary operator
    // return discountPercent && discountPercent > 0 ? pricePln * (1 - discountPercent / 100) : pricePln // ... ? ... : ... <- ternary operator

    // wersja B - klasyczny if-else
    if (discountPercent && discountPercent > 0) {
      return pricePln * (1 - discountPercent / 100);
    } else {
      return pricePln;
    }
  };

  console.log(formatPrice(100));
  console.log(formatPrice(100, 10));
}

////////
//// 3. Zawężanie (narrowing), czyli skąd TypeScript wie, co trzyma
////////
{
  // Gdy wartość może być jednym z kilku typów, kompilator nie pozwoli na nic, co nie działa
  // dla wszystkich. Zawężanie to sprawdzenie, po którym wie już, z czym ma do czynienia.
  // Każdy sposób niżej to zwykły JavaScript, więc pilnuje danych także po uruchomieniu.

  // a) typeof - dla typów PRYMITYWNYCH

  const describeId = (customerId: string | number) => {
    // if (typeof customerId === "string") {
    //   return customerId.toUpperCase();
    // } else {
    //   return customerId.toFixed(2);
    // }

    // 2 sposób - ternary
    return typeof customerId === "string"
      ? customerId.toUpperCase()
      : customerId.toFixed(2);
  };

  console.log(describeId("ab-12"));
  console.log(describeId(7));

  // b) in
  type PrivateCustomer = { name: string };
  type CompanyCustomer = { companyName: string; taxNumber: string };

  const describeCustomer = (customer: PrivateCustomer | CompanyCustomer) => {
    return "taxNumber" in customer // in robi narrowing dla obiektów
      ? `${customer.companyName}, NIP: ${customer.taxNumber}`
      : customer.name;
  };

  console.log(describeCustomer({ name: "Anna" })); // Anna
  console.log(describeCustomer({ companyName: "Sklep ABC", taxNumber: "123" })); // Sklep ABC, NIP: 123

  // c) instanceof - dla instancji klasy
  const describeDelivery = (deliveryDate: Date | string) => {
    return deliveryDate instanceof Date
      ? `Dostawa w ${deliveryDate.getFullYear()}`
      : deliveryDate;
  };

  console.log(describeDelivery(new Date(2026, 8, 8))); // Dostawa w 2026
  console.log(describeDelivery("Wysyłka w dwa dni")); // Wysyłka w dwa dni

  // d) Array.isArray - dla tablic
  const describeCoupons = (couponCodes: string | string[]) => {
    if (Array.isArray(couponCodes)) {
      return couponCodes.join(", "); // .join - zmienia tablicę w string oddzielając poszczególne elementy tablicy separatorem
    } else {
      return couponCodes;
    }
  };

  console.log(describeCoupons(["WIOSNA", "STUDENT"]));
  console.log(describeCoupons("WIOSNA"));
}

{
  // JOIN
  const names = ["Anna", "Mateusz", "Tomek"];
  console.log(names.join(" | "));

  // SPLIT
  const namesStr = "Anna | Mateusz | Tomek";
  console.log(namesStr.split(" | "));
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
