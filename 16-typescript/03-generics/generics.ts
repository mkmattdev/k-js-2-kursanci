////////
//// Blok 3: Generyki i typy narzędziowe
////////

////////
//// WPROWADZENIE: jedna funkcja, TypeScript pamięta, co wróciło
////////
//
// Chcesz jedną funkcję "weź pierwszy element z listy". Dziś lista to napisy, jutro liczby.
// Po wywołaniu TypeScript ma pamiętać, co w tej liście było: na napisie wolno toUpperCase,
// na liczbie toFixed.
//
// Bez generyka zostają dwa złe wyjścia. Albo piszesz tę samą funkcję osobno dla napisów
// i osobno dla liczb. Albo dajesz any[] i kompilator pozwoli wywołać toUpperCase na liczbie.

////////
//// 1. Funkcja generyczna
////////
{
  // T znaczy "typ elementu listy". Nie wpisujesz go przy wywołaniu: z listy napisów
  // TypeScript sam bierze string, z listy liczb number.
  const takeFirst = <T>(items: T[]) => items[0];

  const firstProduct = takeFirst(["Laptop", "Tablet"]);
  const firstPrice = takeFirst([4000, 2000]);

  console.log(firstProduct.toUpperCase()); // LAPTOP
  console.log(firstPrice.toFixed(2)); // 4000.00
}

////////
//// 2. Ograniczenie parametru typu
////////
{
  // Samo T to "cokolwiek", więc w funkcji nie wolno nawet odczytać length.
  // extends { length: number } mówi: wolno podać tylko coś, co ma length
  // (napis, tablica). Wtedy length już wolno czytać.
  const describeLength = <T extends { length: number }>(item: T) =>
    `długość: ${item.length}`;

  console.log(describeLength("Laptop")); // długość: 6
  console.log(describeLength([1, 2, 3])); // długość: 3

  // Błąd - liczba nie ma pola length
  // console.log(describeLength(42));

  // Ta funkcja filtruje listę po dowolnym polu. K to nazwa pola, ale tylko takiego,
  // które w T istnieje. T[K] to typ tego pola: filtrujesz po id, wartość musi być
  // liczbą; filtrujesz po category, musi być napisem.
  type Product = { id: number; name: string; category: string };

  const filterByField = <T, K extends keyof T>(
    items: T[],
    key: K,
    value: T[K],
  ) => items.filter((item) => item[key] === value);

  const products: Product[] = [
    { id: 1, name: "Laptop", category: "elektronika" },
    { id: 2, name: "Koszulka", category: "odzież" },
    { id: 3, name: "Telefon", category: "elektronika" },
  ];

  console.log(filterByField(products, "category", "elektronika").length); // 2

  // Błąd - id jest liczbą, napis "2" nie pasuje
  // filterByField(products, "id", "2");
}

////////
//// 3. Typy narzędziowe
////////
{
  // TypeScript ma gotowe typy, które z jednego kształtu robią inny. Cztery najczęstsze,
  // wszystkie na koncie klienta.
  type CustomerAccount = {
    customerId: number;
    email: string;
    phone: string;
    city: string;
  };

  //// a) Partial: każde pole może nie istnieć

  // Na serwer idzie tylko to, co klient zmienił. Tu zmieniamy telefon, reszty nie wysyłamy.
  type AccountChanges = Partial<CustomerAccount>;
  const changes: AccountChanges = { phone: "600300400" };

  console.log(changes); // { phone: '600300400' }

  //// b) Pick: zostaw tylko te pola z danego typu

  // Do mailingu idzie id i email. Telefonu w tym typie nie ma, więc go nie włożysz.
  type MailingContact = Pick<CustomerAccount, "customerId" | "email">;
  const contact: MailingContact = { customerId: 1, email: "anna@sklep.pl" };

  console.log(contact); // { customerId: 1, email: 'anna@sklep.pl' }

  //// c) Omit: wyrzuć te konkretne pola, reszta zostaje

  // Do logów nie wolno wpuścić maila ani telefonu. To odwrotność Pick.
  type AccountForLog = Omit<CustomerAccount, "email" | "phone">;
  const logEntry: AccountForLog = { customerId: 1, city: "Gdańsk" };

  console.log(logEntry); // { customerId: 1, city: 'Gdańsk' }

  //// d) Record: słownik, te klucze, taki typ wartości

  // Cennik dostawy. Każdy z trzech kurierów musi mieć cenę, brak dhl to błąd.
  type ShippingPricePln = Record<"dpd" | "inpost" | "dhl", number>;
  const shippingPricePln: ShippingPricePln = { dpd: 15, inpost: 12, dhl: 19 };

  console.log(shippingPricePln.inpost); // 12

  // Dopiszesz pole w CustomerAccount, a Partial, Pick i Omit dostaną je same.
  // Nie przepisujesz trzech typów z ręki.
}

////////
//// WIEDZA W PIGUŁCE
////////
//
//  1. <T> to "typ, który poznamy przy wywołaniu". Z takeFirst(["Laptop"]) TypeScript
//     sam bierze string. Nie wpisujesz <string> ręcznie.
//
//  2. Sama T to cokolwiek, więc w funkcji nic na niej nie zrobisz. T extends { length: number }
//     znaczy: wolno tylko coś z polem length, i wtedy to pole wolno czytać.
//
//  3. K extends keyof T: K to nazwa pola, które w T istnieje. T[K] to typ tego pola,
//     więc wartość musi do niego pasować.
//
//  4. <T> można dać też aliasowi, nie tylko funkcji. Na przykład PaginatedResult<T>.
//
//  5. Partial: każde pole może nie istnieć (jest opcjonalne).
//     Pick: zostaw tylko wskazane.
//     Omit: wyrzuć wskazane, reszta zostaje.
//     Record: słownik, te klucze, taki typ wartości.
