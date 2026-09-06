////////
//// Blok 6: Operatory
////////

////////
//// WIEDZA W PIGUŁCE
////////
//
//  1. % daje resztę z dzielenia, ** potęguje, a dzielenie całkowite robimy przez Math.floor.
//
//  2. Skrócone przypisanie += znaczy "weź to, co jest, dodaj i zapisz pod tą samą nazwą".
//
//  3. || i && oddają WARTOŚĆ operandu, nie boolean: || pierwszą truthy albo ostatnią z łańcucha,
//     && pierwszą falsy albo ostatnią z łańcucha.
//
//  4. Reszty łańcucha JS już nie oblicza. Na samych wartościach tego nie widać. Widać to
//     dopiero, gdy w łańcuchu stoi wywołanie funkcji: ono się nie wykona.
//
//  5. ?. przerywa odczyt na null albo undefined i oddaje undefined zamiast rzucić TypeError.
//
//  6. ?? podstawia wartość wyłącznie za null i undefined, inaczej niż ||.
//
//  7. Priorytet: najpierw !, potem &&, na końcu ||. Mieszankę && z || bierzemy w nawiasy.
//
//  PUŁAPKA 1: && w szablonie wypisuje słowo "false", bo oddaje operand zamiast niczego.
//
//  PUŁAPKA 2: ?. chroni odczyt, ale nie obliczenie: undefined * 2 daje NaN.
//
// Niżej to samo na żywo. Odpal: node operators-demo.js

//// 1. Arytmetyka i skrócone przypisania
{
  console.log(17 % 5); // 2, reszta z dzielenia
  console.log(Math.floor(17 / 5)); // 3, ile razy 5 mieści się w 17
  console.log(2 ** 10); // 1024

  let cartItemCount = 3;
  cartItemCount += 2;
  console.log(cartItemCount); // 5
}

//// 2. || i && oddają wartość operandu, nie boolean
{
  console.log(0 || "" || 42 || "Laptop"); // 42
  console.log(20 && "Laptop" && 0 && 42); // 0
  console.log(true && "Laptop"); // "Laptop", a nie true
}

//// 3. ?. i ??
{
  const guestOrder = { id: "ORD-1002", customer: null };

  console.log(0 ?? 10); // 0
  console.log(undefined ?? 10); // 10
  console.log(guestOrder.customer?.address?.city); // undefined, bez wyjątku
  console.log(guestOrder.customer?.address?.city ?? "brak miasta"); // "brak miasta"
}

//// 4. Priorytet: najpierw !, potem &&, na końcu ||
// Nawiasy stawiamy nawet wtedy, gdy akurat wychodzi dobrze.
{
  const userRole = "operator";
  const hasSpecialPermission = false;
  const hasSupportToken = true;

  // Domyślny priorytet, nawiasy tylko go uwidaczniają: "admin z uprawnieniem ALBO ktokolwiek
  // z tokenem".
  console.log((userRole === "admin" && hasSpecialPermission) || hasSupportToken); // true

  // Nawias wokół ||: "admin ORAZ jedno z dwóch".
  console.log(userRole === "admin" && (hasSpecialPermission || hasSupportToken)); // false
}

//// PUŁAPKA 1: && w szablonie wypisuje false
// KONTRPRZYKŁAD: && oddaje operand, czyli false, a szablon zamienia każdą wartość w napis,
// więc na ekranie ląduje słowo "false" zamiast pustego miejsca
{
  const hasValidCard = false;

  console.log(`Pokaż: ${hasValidCard && "Karta jest ważna"}`); // "Pokaż: false"

  // Ternary domyka obie gałęzie tekstem, więc do szablonu wchodzi pusty napis.
  console.log(`Pokaż: ${hasValidCard ? "Karta jest ważna" : ""}`); // "Pokaż: "
}

//// PUŁAPKA 2: ?. chroni odczyt, ale nie obliczenie
// KONTRPRZYKŁAD: problem przeniósł się z linii odczytu do linii obliczenia, trudniejszej
// do znalezienia, bo NaN nie zatrzymuje programu
{
  const guestOrder = { id: "ORD-1002", items: [] };

  console.log(guestOrder.items?.[0]?.pricePln); // undefined
  console.log(guestOrder.items?.[0]?.pricePln * 2); // NaN

  // Brakującą wartość domykamy przez ?? PRZED obliczeniem.
  console.log((guestOrder.items?.[0]?.pricePln ?? 0) * 2); // 0
}
