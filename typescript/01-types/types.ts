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
}
