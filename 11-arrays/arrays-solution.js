////////
//// Blok 11: Tablice, rozwiązanie
////////

////////
//// Zadanie: nazwy dostępnych produktów
////////
{
  // filter i map zwracają nowe tablice, więc łańcuch da się złożyć bez zmiennej pośredniej.
  // Najpierw filter, bo map na pełnej liście przerobiłby też pozycje, które i tak wypadną.

  const createCart = () => [
    { name: "Laptop", pricePln: 3499, quantity: 1, isInStock: true },
    { name: "Mouse", pricePln: 129.99, quantity: 2, isInStock: true },
    { name: "Keyboard", pricePln: 249, quantity: 1, isInStock: false },
  ];

  const getInStockNames = (cartItems) =>
    cartItems.filter((cartItem) => cartItem.isInStock).map((cartItem) => cartItem.name);

  //// Sprawdzenie

  console.log(getInStockNames(createCart())); // [ 'Laptop', 'Mouse' ]
  console.log(getInStockNames([])); // []
}
