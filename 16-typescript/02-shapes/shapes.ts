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

////////
//// 5. Własny strażnik typu
////////
{
  // Z bloku 1: dane z sieci mają typ unknown i nic nie wolno z nimi zrobić przed
  // sprawdzeniem. Takie sprawdzenie powtarza się w kilku miejscach, więc wyjmujemy je
  // do funkcji.
  type PaidOrder = { orderId: number; paidPln: number };

  // Wersja pierwsza: oddaje true, gdy pole paidPln w ogóle jest.
  const looksLikePaid = (value: unknown) =>
    typeof value === "object" && value !== null && "paidPln" in value;

  // Wersja druga: ta sama treść, ale w miejscu typu zwracanego stoi zdanie o wartości,
  // czyli "gdy oddam true, to jest PaidOrder".
  const isPaidOrder = (value: unknown): value is PaidOrder =>
    typeof value === "object" && value !== null && "paidPln" in value;

  const printReceipt = (value: unknown) => {
    // Błąd - po looksLikePaid TypeScript wie tylko tyle, że pole paidPln istnieje. Co w nim
    // siedzi, nadal nie wie, więc pole ma typ unknown i nie da się na nim liczyć.
    // if (looksLikePaid(value)) return `Do zapłaty ${value.paidPln.toFixed(2)} zł`;

    if (isPaidOrder(value)) {
      return `Zamówienie ${value.orderId} na ${value.paidPln.toFixed(2)} zł`;
    }

    return "to nie jest opłacone zamówienie";
  };

  console.log(printReceipt({ orderId: 7, paidPln: 249 })); // Zamówienie 7 na 249.00 zł
  console.log(printReceipt("cokolwiek")); // to nie jest opłacone zamówienie
}

////////
//// 6. as, czyli "zaufaj mi TypeScripcie"
////////
{
  // Zawężanie sprawdza wartość. as nie sprawdza niczego i w samej wartości nie zmienia ani
  // jednej rzeczy - zmienia wyłącznie to, w co wierzy kompilator. TO BARDZO BARDZO RYZYKOWNE!!!
  type Customer = { name: string };
  type VIPCustomer = { name: string; discountPercent: number };

  //// a) as rozszerzający, czyli w stronę typu ogólniejszego

  const vipCustomer: VIPCustomer = { name: "Anna", discountPercent: 10 };
  const asCustomer = vipCustomer as Customer;

  // Błąd (niesłusznie, bo discountPercent w asCustomer istnieje i jego wartość to 10) - kompilator twierdzi, że rabatu tu nie ma
  // console.log(asCustomer.discountPercent);

  //// b) as zwężający, czyli w stronę typu bardziej szczegółowego

  const customer: Customer = { name: "Bartek" };
  const fakeVip = customer as VIPCustomer;

  console.log(fakeVip.discountPercent); // undefined, a typ obiecywał number - Błąd!
  // Skutek - Błąd po uruchomieniu - undefined nie ma metody toFixed
  // console.log(fakeVip.discountPercent.toFixed(0));

  // Fałszywy wynik numer dwa: typ mówi o wartości więcej, niż w niej siedzi. Ta strona boli
  // bardziej, bo program pada dopiero u klienta.

  //// c) asercja niemożliwa i jej skutki

  // Gdy typy nie mają ze sobą nic wspólnego, kompilator odmawia.
  // Błąd - napis i VIPCustomer nie zazębiają się w żadnym miejscu - asercja "as" jest niedozwolona
  // const nonsense = "Anna" as VIPCustomer;

  // Da się to obejść przejściem przez unknown i to jest najgorsze, co można tu zrobić:
  // kompilator milknie zupełnie, a dalej po programie chodzi napis udający klienta.
  const smuggledVip = "Anna" as unknown as VIPCustomer;
  console.log(smuggledVip.name); // undefined, bo napis nie ma pola name

  // Błąd po uruchomieniu - na tej linii program się wywala
  // console.log(smuggledVip.discountPercent.toFixed(0));

  //// d) kiedy as wolno użyć

  //    Gdy naprawdę wiesz więcej niż kompilator (YOU KNOW BETTER THAN TYPESCRIPT) i nie masz (np. czasu) jak mu jakiś typ udowodnić
  //    przy odczycie z DOM, gdzie getElementById oddaje HTMLElement albo null:
  //    const input = document.getElementById("coupon") as HTMLInputElement;
  //
  // Poza tymi trzema: sprawdzaj (czyli rób narrowing), zamiast obiecywać (unikaj as - im mniej tym lepiej).
}

////////
//// WIEDZA W PIGUŁCE
////////
//
//  1. Alias typu nazwie dowolny typ: obiekt, unię, typ prosty. Interfejs opisuje wyłącznie
//     kształt obiektu, za to da się go zadeklarować kilka razy, a opisy się scalą.
//
//  2. Do opisu obiektu alias i interfejs są wymienne. Alias musi wejść przy unii i typie
//     prostym. Interfejs musi wejść, gdy chcesz ciche scalenie drugiej deklaracji.
//
//  3. Znak zapytania znaczy to samo przy kluczu, metodzie i parametrze: tego może nie
//     być, więc do typu dochodzi undefined. Czytamy przez ?., wywołujemy przez ?.(),
//
//  4. Zawężanie to zwykły JavaScript, po którym kompilator wie więcej: typeof dla typów
//     prostych, === null i === undefined dla braku wartości, in dla pól obiektu,
//     instanceof dla klas, Array.isArray dla tablic, porównanie z literałem tam, gdzie
//     w unii stoi konkretna wartość.
//
//  5. Unia dyskryminowana to warianty ze wspólnym polem o stałej wartości. Sprawdzenie tego
//     jednego pola zawęża cały obiekt.
//
//  6. as niczego nie sprawdza, tylko każe kompilatorowi zaufać. W obie strony może kazać mu
//     uwierzyć w nieprawdę: raz zobaczy mniej, niż w wartości siedzi, raz więcej.
