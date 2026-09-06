////////
//// Blok 10: Obiekty, rozwiązanie
////////

////////
//// Zadanie: profil bez ustawień
////////
{
  // Destrukturyzacja z rest wyciąga settings do osobnej nazwy, a cała reszta kluczy ląduje
  // w nowym obiekcie. Oryginał zostaje nietknięty, bo rest buduje nowy obiekt, a nie zmienia stary.

  const customerProfile = {
    userId: 42,
    displayName: "Anna",
    settings: { theme: "dark", fontSizePx: 14 },
  };

  const convertToPublicProfile = (profile) => {
    const { settings, ...publicProfile } = profile;

    return publicProfile;
  };

  //// Sprawdzenie

  console.log(convertToPublicProfile(customerProfile)); // { userId: 42, displayName: 'Anna' }
  console.log(Object.keys(customerProfile).length); // 3
}
