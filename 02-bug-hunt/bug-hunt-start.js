////////
//// Bug hunt
////////

// Przy każdym fragmencie przeczytaj TREŚĆ, uruchom plik i porównaj z OCZEKIWANYM WYNIKIEM.
// Zapisz u siebie, co jest źle i dlaczego. Dopiero z zapisaną odpowiedzią otwórz
// bug-hunt-solution.js i sprawdź się.

////////
//// 1. Dostęp do panelu administracyjnego
////////

// TREŚĆ
// Do panelu wchodzi wyłącznie administrator, i to tylko wtedy, gdy ma dodatkowe
// uprawnienie albo token serwisowy. Zwykły użytkownik nie wchodzi nigdy.
//
// OCZEKIWANY WYNIK
// "Dostęp przyznany: false"
{
  const userRole = "user";
  const hasSpecialPermission = false;
  const hasToken = true;

  const isAuthorized = (userRole === "admin" && hasSpecialPermission) || hasToken;

  console.log(`Dostęp przyznany: ${isAuthorized}`);
}

////////
//// 2. Kopia ustawień użytkownika
////////

// TREŚĆ
// Robimy kopię ustawień i włączamy w niej powiadomienia push.
// Oryginał ma zostać nietknięty, bo służy jako punkt odniesienia przy cofaniu zmian.
//
// OCZEKIWANY WYNIK
// false
{
  const originalSettings = {
    theme: "dark",
    notifications: { email: true, push: false },
  };

  const settingsCopy = { ...originalSettings };
  settingsCopy.notifications.push = true;

  console.log(originalSettings.notifications.push);
}

////////
//// 3. Walidacja ceny produktu
////////

// TREŚĆ
// Dodajemy produkt do rachunku. Cena zero jest poprawna, bo sklep prowadzi gratisy.
// Cena ujemna jest błędem i produkt nie trafia na rachunek.
//
// OCZEKIWANY WYNIK
// cena -5  ->  "Niepoprawna cena"
// cena 0   ->  "Dodano produkt za 0 zł"
{
  const addProductToReceipt = (productPrice) => {
    if (!Number.isNaN(productPrice) && productPrice) {
      return `Dodano produkt za ${productPrice} zł`;
    }

    return "Niepoprawna cena";
  };

  console.log(addProductToReceipt(-5));
  console.log(addProductToReceipt(0));
}
