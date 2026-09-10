////////
//// Blok 1: Typy proste, any, unknown i never
////////

////////
//// 1. Typy proste i wnioskowanie
////////
{
  // Typ zapisujemy po dwukropku, za nazwą zmiennej. Na co dzień starczy string, number
  // i boolean. Reszta prymitywów to null, undefined, bigint i symbol.
  const customerName: string = "Anna";
  const orderTotalPln: number = 249;
  const isPaid: boolean = true;

  console.log(customerName, orderTotalPln, isPaid);

  // Najczęściej nie trzeba ich pisać. TypeScript wnioskuje typ z wartości, więc poniższa
  // zmienna też jest typu string i przypisanie liczby będzie błędem.
  let productName = "Laptop";

  // Błąd - próbujemy do stringa przypisać number
  // productName = 4000;

  // Wniosek: jawny typ piszemy tam, gdzie TypeScript nie ma go skąd wziąć, czyli głównie
  // przy parametrach funkcji.
  const applyDiscount = (pricePln: number, discountPercent: number) =>
    pricePln - (pricePln * discountPercent) / 100;

  console.log(applyDiscount(4000, 10)); // 3600
}

////////
//// 2. any, czyli wyłączony TypeScript
////////
{
  // any oznacza "nie sprawdzaj tu niczego". Na wartości typu any wolno wywołać dowolną
  // metodę i odczytać dowolne pole, a kompilator się nie odezwie.
  const rawOrder: any = { orderId: 7, customer: {} };

  console.log(rawOrder.orderId); // 7

  // Ta linia przechodzi kompilację, a błąd zgłasza dopiero po uruchomieniu, ponieważ customer
  // jest pustym obiektem. Dlatego any nazywamy wyłączeniem TypeScriptu.
  // console.log(rawOrder.customer.profile.email);

  // any wchodzi do kodu najczęściej niejawnie, przez JSON.parse.
  const parsedOrder = JSON.parse('{"orderId":7,"totalPln":249}');

  console.log(parsedOrder.randomField); // undefined, i ani słowa od kompilatora

  // Wniosek: im mniej typu "any" - tym lepiej i bezpieczniej
}

////////
//// 3. unknown, czyli "nie wiem, więc sprawdź"
////////
{
  // unknown mówi to samo co any o naszej wiedzy: nie wiemy, co tu przyszło. Różni się
  // konsekwencją. Na wartości unknown nie wolno zrobić NICZEGO, dopóki nie sprawdzimy,
  // czym ona jest.
  // Uwaga na cudzysłów w środku: kwota jest tu jako napis, a nie jako liczba.
  const rawTotal: unknown = JSON.parse('"249"');

  // Błąd
  // console.log(rawTotal + 100); // "249100", czyli sklejenie napisów zamiast dodawania

  // Po sprawdzeniu typu TypeScript wie, z czym ma do czynienia, i pozwala na resztę.
  if (typeof rawTotal === "number") {
    console.log(rawTotal + 100);
  } else {
    console.log("to nie jest liczba, doliczanie pominięte"); // ta gałąź się wykona
  }

  // To jest ta sama walidacja, którą w dniu 2 pisaliśmy ręcznie, tyle że teraz kompilator
  // pilnuje, żeby jej nie pominąć.
}

////////
//// 4. never, czyli "to się nie zdarzy"
////////
{
  // never to typ wartości, której nie ma. Pojawia się sam w dwóch miejscach.
  //
  // Pierwsze: funkcja, która nigdy nie zwraca wyniku, bo zawsze rzuca błąd.
  const failOrder = (reason: string): never => {
    throw new Error(reason);
  };

  // Drugie, i to jest zastosowanie praktyczne: miejsce w kodzie, do którego nie da się
  // dojść. Po sprawdzeniu obu wartości unii nie zostaje już nic, więc zmienna ma typ never.
  type PaymentMethod = "card" | "transfer";

  const describePayment = (method: PaymentMethod) => {
    if (method === "card") {
      return "Płatność kartą";
    }

    if (method === "transfer") {
      return "Przelew";
    }

    const impossiblePaymentMethod: never = method;

    return failOrder(
      `Nieobsłużona metoda płatności: ${impossiblePaymentMethod}`,
    );
  };

  console.log(describePayment("card")); // Płatność kartą

  // Po co to komu: gdy do PaymentMethod dojdzie kiedyś "blik", przypisanie do never
  // przestanie się kompilować i kompilator wskaże miejsce, w którym trzeba dopisać obsługę.
  // Bez tej linii program po cichu zwróciłby undefined.
}

////////
//// WIEDZA W PIGUŁCE
////////
//
//  1. Typy istnieją wyłącznie przed uruchomieniem. Po kompilacji zostaje zwykły JavaScript,
//     więc TypeScript nie sprawdzi za ciebie danych, które przyjdą z sieci.
//
//  2. Typ piszemy tam, gdzie TypeScript nie ma go skąd wywnioskować, czyli przede wszystkim
//     przy parametrach funkcji. Reszty nie annotujemy bez potrzeby.
//
//  3. any wyłącza sprawdzanie. Wchodzi do kodu najczęściej niejawnie, przez JSON.parse
//     i przez odpowiedzi z sieci.
//
//  4. unknown to bezpieczny odpowiednik any: też oznacza "nie wiem, co to jest", ale nie
//     pozwala niczego z tym zrobić przed sprawdzeniem typu.
//
//  5. never to typ wartości, której nie ma. Przypisanie do never w ostatniej gałęzi
//     sprawia, że dopisanie nowego wariantu unii przestaje się kompilować.
