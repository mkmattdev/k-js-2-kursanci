////////
//// Blok 1, zadanie 1: cennik promocyjny, rozwiązanie
////////
{
  // Rabat liczymy od ceny netto, a VAT od ceny po rabacie, ponieważ odwrotna kolejność daje
  // inną kwotę. Formatowanie jest ostatnim krokiem, ponieważ toFixed zwraca napis, czyli
  // suma musi rosnąć na liczbach.

  const PROMO_DISCOUNT_PERCENT = 15;
  const VAT_PERCENT = 23;
  const netPricesPln = [199, 49.9, 1250];

  const applyPromoDiscountPln = (
    pricePln: number,
    discountPercent: number,
  ): number => pricePln * (1 - discountPercent / 100);

  const addVatPln = (netPricePln: number, vatPercent: number): number =>
    netPricePln * (1 + vatPercent / 100);

  const formatPricePln = (amountPln: number): string =>
    `${amountPln.toFixed(2)} zł`;

  let totalGrossPln = 0;

  //// Sprawdzenie

  for (const netPricePln of netPricesPln) {
    const discountedPricePln = applyPromoDiscountPln(
      netPricePln,
      PROMO_DISCOUNT_PERCENT,
    );
    const grossPricePln = addVatPln(discountedPricePln, VAT_PERCENT);

    totalGrossPln += grossPricePln;

    console.log(formatPricePln(grossPricePln)); // 208.05 zł, potem 52.17 zł, potem 1306.88 zł
  }

  console.log(`Razem: ${formatPricePln(totalGrossPln)}`); // Razem: 1567.10 zł
}
