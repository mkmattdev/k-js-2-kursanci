////////
//// Blok 2, zadanie 2: kursy walut z prawdziwego API, rozwiązanie
////////
{
  // fetch odrzuca obietnicę tylko wtedy, gdy zapytanie w ogóle nie doszło. Kod 404 albo 422
  // jest dla niego poprawną odpowiedzią, dlatego sprawdzamy response.ok, zanim odczytamy JSON.
  // Promise.all startuje wszystkie zapytania naraz i czeka na ostatnie, więc trzy kursy
  // kosztują tyle, co jeden, zamiast tyle, co trzy pod rząd.

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
    const response = await fetch(
      `${RATES_API_URL}/${currency}/PLN?date=${INVOICE_DATE}&providers=${RATE_PROVIDER}`,
    );

    if (!response.ok) {
      throw new Error(`Nieznana waluta: ${currency}`);
    }

    const rateData = await response.json();

    return rateData.rate;
  };

  const convertInvoicesToPln = async (invoices) => {
    const rates = await Promise.all(invoices.map((invoice) => fetchRateToPln(invoice.currency)));

    const totalPln = invoices.reduce(
      (sum, invoice, invoiceIndex) => sum + invoice.amount * rates[invoiceIndex],
      0,
    );

    return Math.round(totalPln * 100) / 100;
  };

  //// Sprawdzenie

  const check = async () => {
    console.log(await fetchRateToPln("USD"));
    // 3.7371

    console.log(await fetchRateToPln("EUR"));
    // 4.3313

    try {
      await fetchRateToPln("XYZ");
      console.log("nie rzucił błędu");
    } catch (error) {
      console.log(error.message);
    }
    // Nieznana waluta: XYZ

    console.time("faktury");
    console.log(await convertInvoicesToPln(INVOICES));
    // 2055.18
    console.timeEnd("faktury");
    // czas jest tu jedyną różnicą między rozwiązaniami: wersja pobierająca kursy
    // po kolei potrzebuje mniej więcej półtora raza tyle
  };

  check();
}
