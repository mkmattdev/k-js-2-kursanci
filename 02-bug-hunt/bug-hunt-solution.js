////////
//// Bug hunt - rozwiązania
////////

// Omówienie. Przy każdym punkcie: co wypisuje kod z zadania, dlaczego, i jak to naprawić.

////////
//// 1. Dostęp do panelu administracyjnego
////////

// WYPISUJE: "Dostęp przyznany: true".
// DLACZEGO: nawias obejmuje zły człon. Zapis znaczy "admin z uprawnieniem ALBO
// ktokolwiek z tokenem", więc sam token przepuszcza zwykłego użytkownika.
// NAPRAWA: nawias wokół ||, wtedy rola jest sprawdzana zawsze.

{
  const userRole = "user";
  const hasSpecialPermission = false;
  const hasToken = true;

  const isAuthorized = userRole === "admin" && (hasSpecialPermission || hasToken);

  console.log(`1. po poprawce: ${isAuthorized}`); // false
}

////////
//// 2. Kopia ustawień użytkownika
////////

// WYPISUJE: true, choć oryginał miał zostać nietknięty.
// DLACZEGO: spread kopiuje tylko pierwszy poziom. Pod kluczem notifications leży adres
// tego samego obiektu, więc kopia i oryginał dzielą go między sobą.
// NAPRAWA: rozwinąć spreadem też zagnieżdżony obiekt (2a) albo structuredClone (2b).

{
  const originalSettings = {
    theme: "dark",
    notifications: { email: true, push: false },
  };

  const settingsCopy = {
    ...originalSettings,
    notifications: { ...originalSettings.notifications, push: true },
  };

  console.log(`2a. po poprawce: ${originalSettings.notifications.push}`); // false
  console.log(`    w kopii: ${settingsCopy.notifications.push}`); // true
}

{
  const originalSettings = {
    theme: "dark",
    notifications: { email: true, push: false },
  };

  const settingsCopy = structuredClone(originalSettings);
  settingsCopy.notifications.push = true;

  console.log(`2b. po poprawce: ${originalSettings.notifications.push}`); // false
  console.log(`    w kopii: ${settingsCopy.notifications.push}`); // true
}

////////
//// 3. Walidacja ceny produktu
////////

// WYPISUJE: "Dodano produkt za -5 zł" i "Niepoprawna cena", czyli odwrotnie, niż miało być.
// DLACZEGO: dwa błędy naraz. Number.isNaN(-5) to false, więc ten warunek przepuszcza
// każdą liczbę, także ujemną. A samo productPrice odrzuca zero, bo 0 jest falsy.
// NAPRAWA: sprawdzić osobno, czy to liczba i czy nie jest ujemna.

{
  const addProductToReceipt = (productPrice) => {
    if (Number.isFinite(productPrice) && productPrice >= 0) {
      return `Dodano produkt za ${productPrice} zł`;
    }

    return "Niepoprawna cena";
  };

  console.log(addProductToReceipt(-5)); // "Niepoprawna cena"
  console.log(addProductToReceipt(0)); // "Dodano produkt za 0 zł"
}
