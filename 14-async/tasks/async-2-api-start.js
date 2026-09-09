////////
//// Blok 2, zadanie 2: kursy walut z prawdziwego API
////////
{
  // KONTEKST BIZNESOWY
  // Sklep wystawia faktury w euro, dolarach i funtach, a księgowość rozlicza je w złotówkach
  // po kursie z dnia wystawienia. Kursy pobieramy z api.frankfurter.dev, który udostępnia
  // dane Europejskiego Banku Centralnego bez klucza i bez limitu zapytań.
  //
  // USER STORY
  // Jako księgowy chcę zobaczyć sumę faktur przeliczoną na złotówki po kursie z dnia
  // wystawienia, aby nie przepisywać kursów ręcznie z tabeli.
  //
  // KRYTERIA AKCEPTACJI
  // - fetchRateToPln przyjmuje kod waluty i zwraca kurs jako liczbę
  // - jeżeli API odpowie kodem spoza zakresu sukcesu, rzuca Error "Nieznana waluta: <kod>"
  // - convertInvoicesToPln pobiera wszystkie kursy RÓWNOLEGLE i zwraca sumę w złotych,
  //   zaokrągloną do dwóch miejsc po przecinku
  // - adres API, data i lista faktur są gotowe, nie zmieniamy ich
  //
  // PRZYKŁADY WYWOŁANIA (pozostałe w sekcji Sprawdzenie)
  // fetchRateToPln("USD")  ->  3.7371
  // fetchRateToPln("XYZ")  ->  Error "Nieznana waluta: XYZ"
  //
  // Uwaga: fetch NIE rzuca błędu przy kodzie 404 czy 422. Kod odpowiedzi trzeba sprawdzić
  // samemu, zanim odczytasz treść. Adres jednej waluty wygląda tak:
  // https://api.frankfurter.dev/v2/rate/USD/PLN?date=2026-09-01&providers=ECB

  const RATES_API_URL = "https://api.frankfurter.dev/v2/rate";
  // Data z przeszłości i dzień roboczy EBC. Dla weekendu albo święta API oddaje kurs
  // z ostatniego dnia notowań, czyli inną datę, niż podaliśmy w zapytaniu.
  const INVOICE_DATE = "2026-09-01";

  // Kurs referencyjny EBC, a nie uśredniony: księgowość rozlicza się po kursie oficjalnym.
  const RATE_PROVIDER = "ECB";

  const INVOICES = [
    { amount: 240, currency: "EUR" },
    { amount: 150, currency: "USD" },
    { amount: 90, currency: "GBP" },
  ];

  const fetchRateToPln = async (currency) => {
    // TODO: pobierz, sprawdź kod odpowiedzi, dopiero potem odczytaj JSON i zwróć pole rate
  };

  const convertInvoicesToPln = async (invoices) => {
    // TODO: wystartuj wszystkie zapytania naraz, potem policz sumę
  };

  //// Sprawdzenie

  const check = async () => {
    console.log(await fetchRateToPln("USD"));
    // ma być: 3.7371

    console.log(await fetchRateToPln("EUR"));
    // ma być: 4.3313

    try {
      await fetchRateToPln("XYZ");
      console.log("nie rzucił błędu");
    } catch (error) {
      console.log(error.message);
    }
    // ma być: Nieznana waluta: XYZ

    console.time("faktury");
    console.log(await convertInvoicesToPln(INVOICES));
    // ma być: 2055.18
    console.timeEnd("faktury");
    // czas jest tu jedyną różnicą między rozwiązaniami: wersja pobierająca kursy
    // po kolei potrzebuje mniej więcej półtora raza tyle
  };

  check();
}
