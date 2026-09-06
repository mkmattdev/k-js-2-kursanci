////////
//// Blok 10: Obiekty, zadanie
////////

////////
//// Zadanie: profil bez ustawień
////////
{
  // KONTEKST KOMERCYJNY
  // Panel obsługi klienta, karta klienta. Konsultant ma widzieć dane identyfikujące,
  // a prywatne ustawienia konta już nie, więc przed wyświetleniem trzeba je odciąć.
  //
  // CO MASZ ZROBIĆ
  // Napisz convertToPublicProfile: bierze profil, oddaje NOWY obiekt bez klucza settings.
  // Reszta kluczy zostaje nietknięta, a profil z argumentu ma zostać bez zmian.
  // Odcięcie robimy destrukturyzacją z rest, bez delete.
  //
  // MA DZIAŁAĆ TAK
  // convertToPublicProfile(customerProfile)  ->  { userId: 42, displayName: 'Anna' }
  // customerProfile                          ->  nadal ma wszystkie trzy klucze

  const customerProfile = {
    userId: 42,
    displayName: "Anna",
    settings: { theme: "dark", fontSizePx: 14 },
  };

  const convertToPublicProfile = (profile) => {
    // TODO: odetnij settings, zwróć resztę
  };

  //// Sprawdzenie

  console.log(convertToPublicProfile(customerProfile)); // ma być: { userId: 42, displayName: 'Anna' }
  console.log(Object.keys(customerProfile).length); // ma być: 3, oryginał nietknięty
}
