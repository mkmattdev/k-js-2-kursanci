////////
//// Blok 11: Tablice, zadanie
////////

////////
//// Zadanie: nazwy dostępnych produktów
////////
{
  // KONTEKST KOMERCYJNY
  // Sklep internetowy, podgląd koszyka. Klient ma zobaczyć listę pozycji gotowych
  // do wysyłki, więc te niedostępne nie mogą się na niej znaleźć.
  //
  // CO MASZ ZROBIĆ
  // Napisz getInStockNames: bierze pozycje koszyka, oddaje tablicę samych NAZW.
  // Pozycje z isInStock równym false wypadają, a pusty koszyk daje pustą tablicę.
  //
  // MA DZIAŁAĆ TAK
  // getInStockNames(createCart())  ->  [ 'Laptop', 'Mouse' ]
  // getInStockNames([])            ->  []

  const createCart = () => [
    { name: "Laptop", pricePln: 3499, quantity: 1, isInStock: true },
    { name: "Mouse", pricePln: 129.99, quantity: 2, isInStock: true },
    { name: "Keyboard", pricePln: 249, quantity: 1, isInStock: false },
  ];

  const getInStockNames = (cartItems) => {
    // TODO: najpierw odsiej niedostępne, potem zostaw same nazwy
  };

  //// Sprawdzenie

  console.log(getInStockNames(createCart())); // ma być: [ 'Laptop', 'Mouse' ]
  console.log(getInStockNames([])); // ma być: []
}
