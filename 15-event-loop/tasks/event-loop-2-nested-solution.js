////////
//// Blok 3, zadanie 2: w jakiej kolejności to się wypisze, rozwiązanie
////////
{
  // ODPOWIEDŹ: 1 4 8 5 6 2 3 7
  //
  // Najpierw stos, czyli wszystko, co da się wykonać bez czekania:
  //   1   pierwsza linia
  //   4   ciało funkcji async wykonuje się natychmiast, aż do await
  //   8   ostatnia linia
  //
  // Potem CAŁA kolejka mikrozadań, w kolejności zapisania:
  //   5   reszta loadCart, odłożona przez await na już rozstrzygniętą obietnicę
  //   6   drugie mikrozadanie w kolejności zapisania; przy okazji dokłada setTimeout na 7
  //
  // Dopiero teraz makrozadania, po jednym, a po każdym znowu mikrozadania:
  //   2   pierwszy setTimeout, zapisany jako pierwszy
  //   3   mikrozadanie utworzone wewnątrz 2, więc wchodzi zaraz po nim,
  //       jeszcze przed kolejnym makrozadaniem
  //   7   setTimeout zapisany dopiero w mikrozadaniu 6, więc stoi w kolejce za 2
  //
  // Dwa miejsca, w których najłatwiej się pomylić: 4 stoi przed 8, ponieważ funkcja async
  // nie jest odkładana na potem, oraz 3 stoi przed 7, ponieważ mikrozadania wchodzą
  // pomiędzy makrozadaniami, a nie dopiero po wszystkich.

  console.log("1");

  setTimeout(() => {
    console.log("2");
    Promise.resolve().then(() => console.log("3"));
  }, 0);

  const getCachedCart = () => Promise.resolve({ itemCount: 3 });

  const loadCart = async () => {
    console.log("4");
    await getCachedCart();
    console.log("5");
  };

  loadCart();

  Promise.resolve().then(() => {
    console.log("6");
    setTimeout(() => console.log("7"), 0);
  });

  console.log("8");
}
