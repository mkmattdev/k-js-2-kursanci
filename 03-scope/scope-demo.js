////////
//// Blok 3: Zmienne i zakres
////////

////////
//// WIEDZA W PIGUŁCE
////////
//
//  1. Zakres to obszar, w którym nazwa jest widoczna. Są trzy: moduł (cały plik),
//     funkcja i blok, czyli każdy { } z kodem: w if, w pętli i stojący sam.
//     Klamry literału obiektu zakresem nie są (np. const user = {} <-- te klamry to NIE ZAKRES).
//
//  2. Zakres wewnętrzny widzi to, co na zewnątrz. Odwrotnie nigdy.
//
//  3. let i const znikają na końcu swojego bloku. var nie zna bloku: żyje do końca
//     funkcji albo całego modułu. let, const = ZAKRES BLOKOWY. var = ZAKRES FUNKCYJNY
//
//  4. const blokuje przypisanie do samej NAZWY. Wnętrze obiektu i tablicy wolno zmieniać.
//
//  5. Domyślnie const, let tylko tam, gdzie wartość naprawdę się zmienia, var nigdy.
//
//  PUŁAPKA 1: var wycieka z ifa i z pętli, razem z końcową wartością licznika.
//
//  PUŁAPKA 2: var odczytana przed deklaracją daje undefined zamiast błędu.

// Ta nazwa stoi na poziomie modułu, więc widzą ją wszystkie sekcje poniżej.
const SHOP_NAME = "MattShop";

//// 1. Trzy zakresy: moduł, funkcja, blok
{
  const buildGreeting = (customerName) => {
    const greetingText = `Witaj w ${SHOP_NAME}, ${customerName}`;

    return greetingText;
  };

  console.log(buildGreeting("Anna")); // "Witaj w MattShop, Anna"

  // Po odkomentowaniu: ReferenceError: greetingText is not defined
  // console.log(greetingText);

  if (SHOP_NAME.length > 0) {
    const isShopOpen = true;
    console.log(isShopOpen); // true
  }

  // Po odkomentowaniu: ReferenceError: isShopOpen is not defined
  // console.log(isShopOpen);
}

//// 2. Czego const naprawdę pilnuje
{
  const settings = { theme: "dark" };
  settings.theme = "light";
  console.log(settings.theme); // "light", const tego nie blokuje

  const productNames = ["Laptop"];
  productNames.push("Mouse");
  console.log(productNames.length); // 2

  // Po odkomentowaniu: TypeError: Assignment to constant variable.
  // settings = { theme: "light" };

  // Wniosek: const pilnuje zmiany REFERENCJI (przypisania nowego obiektu), ale nie pilnuje manipulacji w ramach tej samej referencji (tego samego obiektu, tablicy, mapy, zbioru itd.)
}

//// PUŁAPKA 1: var nie zna granicy bloku
// KONTRPRZYKŁAD: var przeżywa i ifa, i pętlę
{
  if (true) {
    var shippingLabelVar = "var";
    let shippingLabelLet = "let";
  }

  console.log(shippingLabelVar); // "var", mimo że blok if już się zamknął

  // Po odkomentowaniu: ReferenceError: shippingLabelLet is not defined
  // console.log(shippingLabelLet);

  for (var orderIndexVar = 0; orderIndexVar < 3; orderIndexVar += 1) {
    // ciało pętli nie jest tu istotne
  }

  console.log(orderIndexVar); // 3, licznik został po pętli razem z wartością końcową
}

//// PUŁAPKA 2: var i hoisting, czyli ciche undefined
// KONTRPRZYKŁAD: literówka albo przestawiona linia nie zatrzymuje programu, tylko psuje
// wynik kawałek dalej
{
  console.log(userAge); // undefined, a nie błąd
  var userAge = 27;
  console.log(userAge); // 27

  // Po odkomentowaniu: ReferenceError: Cannot access 'userName' before initialization - TDZ
  // console.log(userName);
  const userName = "Anna";
  console.log(userName); // "Anna"
}
