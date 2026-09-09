////////
//// Metody tablicowe niemutowalne
////////

////////
//// Map
////////
{
  // Map - operauje na każdym elemencie tablicy, modyfikuje go i zwraca w nowej tablicy
  const products = ["Laptop", "Phone", "Tablet"];

  // Chcemy mieć w tablicy długości napisów
  // 1 sposób - z wykorzystaniem mutującej metody .push i tablicy productsLength
  // const productsLength = [];

  // for (let i = 0; i < products.length; i++) {
  //   productsLength.push(products[i].length);
  // }
  // console.log(productsLength); // [6, 5, 6]

  // 2 sposób - z wykorzystaniem niemutującej metody .map
  // const productsNameLength = products.map((product) => {
  //   return product.length;
  // });

  // skrócona wersja - lepsza
  const productsNameLength = products.map((product) => product.length);

  // Przykład - podbicie ceny każdego produktu o 10%
  const productsWithPrice = [
    {
      name: "Table",
      price: 500.5,
    },
    {
      name: "Chair",
      price: 400,
    },
    {
      name: "Bed",
      price: 2000,
    },
  ];

  const productsWithPriceAfterInflation = productsWithPrice.map((product) => ({
    ...product,
    price: +(product.price * 1.1).toFixed(2),
  }));

  // 2 sposób - wersja z jawnym return
  // const productsWithPriceAfterInflation = productsWithPrice.map(product => {
  //     return {
  //         ...product,
  //         price: +(product.price * 1.1).toFixed(2)
  //     };
  // });

  console.log("productsWithPrice", productsWithPrice);
  console.log(
    "productsWithPriceAfterInflation",
    productsWithPriceAfterInflation,
  );
}

////////
//// Zadanie
////////
{
  // Firma e-commerce prowadzi magazyn produktów, a ceny w systemie zapisane są jako ceny brutto (z podatkiem VAT).
  // Firma chce stworzyć nową tablicę także z cenami netto (bez VAT) każdego elementu,
  // które zostaną zapisane do systemu. Twoim zadaniem jest przygotowanie skryptu, który przekształci każdy produkt,
  // zwracając nową tablicę z dodatkowymi informacjami.
  const productsWithGrossPrices = [
    { name: "Laptop", grossPrice: 3000, vatRate: 0.23 },
    { name: "Smartphone", grossPrice: 2000, vatRate: 0.23 },
    { name: "Monitor", grossPrice: 1200, vatRate: 0.23 },
    { name: "Desk", grossPrice: 800, vatRate: 0.08 },
  ];

  const productsWithPrice = productsWithGrossPrices.map((product) => {
    const { grossPrice, vatRate } = product;
    const netPrice = +(grossPrice / (1 + vatRate)).toFixed(2);
    return {
      ...product,
      netPrice,
    };
  });
  console.log(productsWithPrice);
}

////////
//// Filter
////////
{
  // Filter - operuje na kazdym elemencie tablicy i zwraca te, ktore spelniaja okreslony warunek
  const users = [
    { name: "Mateusz", isActive: true },
    { name: "Tomasz", isActive: false },
    { name: "Ewa", isActive: true },
  ];

  const activeUsers = users.filter((user) => user.isActive);

  console.log("users", users);
  console.log("activeUsers", activeUsers);
}

////////
//// Zadanie
////////
{
  // Załóżmy, że firma e-commerce chce wyświetlić listę zamówień, które są gotowe do wysyłki.
  // Zamówienia są gotowe do wysyłki, jeśli ich status to “paid” i zostały złożone w ciągu ostatnich 7 dni.
  // Skrypt filtruje tylko te zamówienia, które spełniają te dwa warunki.
  const orders = [
    { orderId: "A001", status: "paid", date: "2024-10-10" },
    { orderId: "A002", status: "pending", date: "2024-10-18" },
    { orderId: "A003", status: "paid", date: "2024-10-22" },
    { orderId: "A004", status: "reserved", date: "2024-10-22" },
    { orderId: "A005", status: "paid", date: "2025-02-08" },
    { orderId: "A006", status: "paid", date: "2024-10-15" },
    { orderId: "A007", status: "paid", date: "2024-10-17" },
  ];

  const getPastDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  };

  const SEVEN_DAYS_AGO = getPastDate(7);

  const readyToShipOrders = orders.filter(
    ({ status, date }) => status === "paid" && new Date(date) >= SEVEN_DAYS_AGO,
  );

  console.log(readyToShipOrders);
}

////////
//// Find
////////
{
  // Find - operuje na każdym elemencie tablicy i zwraca ten element, ktory jako pierwszy spełnia okreslony warunek
  const products = [
    { id: 1, name: "Laptop", price: 4500, hasDiscount: false },
    { id: 2, name: "Smartfon", price: 3000, hasDiscount: true },
    { id: 3, name: "Tablet", price: 1500, hasDiscount: true },
  ];

  const discountedProduct = products.find((product) => product.hasDiscount);

  console.log(discountedProduct);
  // Wynik: { id: 2, name: "Smartfon", price: 3000, discount: true }
}

////////
//// Zadanie
////////
{
  // Firma e-commerce chce znaleźć pierwszego klienta, który spełnia poniższe warunki:
  // 	1.	Jego konto jest aktywne
  // 	2.	Posiada co najmniej jedno zamówienie
  // 	3.	Kwota ostatniego zamówienia przekracza 500 zł

  // Wymagane jest użycie opcjonalnego łańcuchowania (optional chaining) do obsługi struktury danych, która może zawierać brakujące klucze.

  const customers = [
    {
      id: 1,
      name: "John Doe",
      isActive: false,
      orders: [
        { orderId: 101, amount: 600 },
        { orderId: 102, amount: 200 },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      isActive: true,
      orders: [{ orderId: 103, amount: 400 }],
    },
    {
      id: 3,
      name: "Alice Johnson",
      isActive: true,
      orders: [
        { orderId: 104, amount: 700 },
        { orderId: 105, amount: 300 },
      ],
    },
    {
      id: 4,
      name: "Bob Brown",
      isActive: true,
      orders: [],
    },
  ];

  const eligibleCustomer = customers.find(
    (customer) => customer.isActive && customer.orders?.at(-1)?.amount > 500,
  );

  // równoważne
  // const eligibleCustomer = customers.find(({ isActive, orders }) => isActive && orders?.at(-1)?.amount > 500);

  console.log(eligibleCustomer ?? "No customer found with that requirement");
}

////////
//// Reduce
////////
{
  // Reduce - służy do zakumulowania jakiejś wartości (np. zsumowania ceny ze wszystkich obiektów w tablicy)
  const productsWithPrice = [
    {
      name: "Table",
      price: 500,
    },
    {
      name: "Chair",
      price: 100,
    },
    {
      name: "Bed",
      price: 2000,
    },
  ];

  const totalPrice = productsWithPrice.reduce(
    (sum, item) => sum + item.price,
    0,
  );
  console.log(`Całkowita cena: ${totalPrice.toFixed(2)}`);

  // Przykład - przypisanie nazwy do danej kategorii
  const products = [
    { name: "Apple", category: "Fruits" },
    { name: "Banana", category: "Fruits" },
    { name: "Carrot", category: "Vegetables" },
    { name: "Broccoli", category: "Vegetables" },
    { name: "Steak", category: "Meat" },
    { name: "Chicken", category: "Meat" },
    { name: "Orange", category: "Fruits" },
  ];

  // 1sza iteracja:
  // Acc: {}, product: { name: "Apple", category: "Fruits" },
  // acc["Fruits"] = 1;

  // 2ga iteracja:
  // Acc: { "fruits": 1 }, product: { name: "Banana", category: "Fruits" },
  // acc["Fruits"] = 2

  // 3cia iteracja:
  // Acc: { "fruits": 2},  product: { name: "Carrot", category: "Vegetables" },
  // acc["vegetables"] = 1;

  // 4ta iteracja
  // Acc: {"fruits": 2, "vegetables": 1}, product:  { name: "Broccoli", category: "vegetables" },
  // acc["vegetables"] = 2;

  // 5ta iteracja
  // Acc: {"fruits": 2, "vegetables": 2}, product:   { name: "Steak", category: "Meat" },
  // acc["Meat"] = 1;

  // 6ta iteracja
  // Acc: {"fruits": 2, "vegetables": 2, "Meat": 1}

  const categoryCount = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] ?? 0) + 1;
    return acc;
  }, {});

  console.log(categoryCount);
}

////////
//// Zadanie
////////
{
  // Mamy koszyk z produktami, gdzie każdy produkt ma swoją cenę, ilość oraz ewentualny rabat.
  // Naszym celem jest obliczenie końcowej kwoty do zapłaty, uwzględniając rabaty i podatek VAT.

  const cartItems = [
    { name: "Laptop", price: 3000, quantity: 1, discount: 0.1 }, // 10% rabatu
    { name: "Mouse", price: 150, quantity: 2, discount: 0.05 }, // 5% rabatu
    { name: "Keyboard", price: 400, quantity: 1, discount: 0 }, // bez rabatu
  ];

  const VAT_RATE = 0.23; // stawka VAT 23%

  // Obliczamy końcową wartość zamówienia
  const totalOrderValue = cartItems.reduce(
    (totalPrice, { discount, price, quantity }) => {
      // Obliczamy cenę po rabacie dla jednego produktu
      const discountedPrice = price * (1 - discount);
      // Mnożymy przez ilość sztuk
      const totalItemPrice = discountedPrice * quantity;
      // Dodajemy cenę produktu z uwzględnieniem VAT
      return totalPrice + totalItemPrice * (1 + VAT_RATE);
    },
    0,
  );

  console.log(`Wartość zamówienia: ${totalOrderValue.toFixed(2)} PLN`);
}

////////
//// Every
////////
{
  const productsWithPrice = [
    {
      name: "Table",
      price: 5000,
    },
    {
      name: "Chair",
      price: 1001,
    },
    {
      name: "Bed",
      price: 2000,
    },
  ];

  // Every - zwraca true, gdy wszystkie elementy w tablicy spełniają określony warunek
  const areAllPricesGreaterThanThousand = productsWithPrice.every(
    (product) => product.price > 1000,
  );

  console.log(
    `Are all prices greather than thousand? ${areAllPricesGreaterThanThousand}`, // true
  );
}

////////
//// Some
////////
{
  const productsWithPrice = [
    {
      name: "Table",
      price: 5000,
    },
    {
      name: "Chair",
      price: 150,
    },
    {
      name: "Bed",
      price: 2000,
    },
  ];

  // Some - zwraca true, gdy chociaż jeden element w tablicy spełnia określony warunek
  const hasCheapItems = productsWithPrice.some(
    (product) => product.price <= 200,
  );

  console.log(`Has cheap items? ${hasCheapItems}`); // true
}

////////
//// Zadanie
////////
{
  // Załóżmy, że mamy listę zamówionych produktów, w której każda pozycja zawiera informację o wymaganej ilości
  // i dostępnej ilości w magazynie.
  const orderItems = [
    { name: "Laptop", quantityRequired: 2, quantityAvailable: 5 },
    { name: "Keyboard", quantityRequired: 1, quantityAvailable: 0 },
    { name: "Mouse", quantityRequired: 3, quantityAvailable: 3 },
    { name: "Monitor", quantityRequired: 1, quantityAvailable: 0 },
  ];

  // 1.	Sprawdź, czy wszystkie produkty w zamówieniu mają wystarczającą ilość dostępnych sztuk w magazynie
  // (quantityAvailable >= quantityRequired). Jeśli tak, zamówienie może być wysłane w całości.
  // 2.	Jeśli nie wszystkie produkty są dostępne w odpowiedniej ilości, sprawdź, czy przynajmniej
  // niektóre produkty mają wystarczającą ilość na stanie, aby zaproponować częściową wysyłkę.

  // Użytkownik ma zobaczyć jeden z trzech komunikatów:
  // a) Całe zamówienie może zostać zrealizowane.
  // b) Niektóre pozycje są dostępne do częściowej realizacji.
  // c) Żaden z produktów nie jest dostępny w wystarczającej ilości.
  // Sprawdzamy, czy wszystkie produkty w zamówieniu są dostępne w wymaganej ilości

  // Sprawdzamy, czy wszystkie produkty w zamówieniu są dostępne w wymaganej ilości
  const canFulfillEntireOrder = orderItems.every(
    (item) => item.quantityAvailable >= item.quantityRequired,
  );

  // Jeśli nie można wysłać całego zamówienia, sprawdzamy, czy można wysłać część produktów
  const canFulfillPartialOrder = orderItems.some(
    (item) => item.quantityAvailable >= item.quantityRequired,
  );

  if (canFulfillEntireOrder) {
    console.log("Całe zamówienie może zostać zrealizowane.");
  } else if (canFulfillPartialOrder) {
    console.log("Niektóre pozycje są dostępne do częściowej realizacji.");
  } else {
    console.log("Żaden z produktów nie jest dostępny w wystarczającej ilości.");
  }
}
