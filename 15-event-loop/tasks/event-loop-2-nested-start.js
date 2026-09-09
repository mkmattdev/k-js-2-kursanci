////////
//// Blok 3, zadanie 2: w jakiej kolejności to się wypisze?
////////
{
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
