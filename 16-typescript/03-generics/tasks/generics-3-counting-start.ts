////////
//// Blok 3, zadanie 3: ile po statusie, ile po kurierze
////////
//
// KONTEKST BIZNESOWY
// Panel sprzedaży pokazuje dwa zestawienia z tej samej listy zamówień: ile jest opłaconych
// i oczekujących, oraz ile paczek jedzie DPD, a ile InPost. Dziś każde zestawienie to osobna
// funkcja, choć różnią się tylko tym, po którym polu liczymy.
//
// DANE
// Lista zamówień:
//   { orderId: 1, status: "paid",    courier: "DPD" }
//   { orderId: 2, status: "paid",    courier: "InPost" }
//   { orderId: 3, status: "pending", courier: "DPD" }
//   { orderId: 4, status: "paid",    courier: "InPost" }
//
// USER STORY
// Jako kierownik sprzedaży chcę jedną funkcję, która policzy zamówienia po statusie,
// a chwilę później po kurierze, żeby nowe zestawienie nie wymagało kolejnej funkcji.
//
// KRYTERIA AKCEPTACJI
// - jedna funkcja, dwa argumenty: lista oraz mała funkcja, która z jednego elementu
//   wyciąga napis (na przykład status albo kuriera)
// - wynik to słownik: ten napis -> ile razy wystąpił na liście
//   countByKey(orders, (order) => order.status)   ->  { paid: 3, pending: 1 }
//   countByKey(orders, (order) => order.courier)  ->  { DPD: 2, InPost: 2 }
// - element listy ma typ T, żeby ta sama funkcja liczyła zamówienia tak samo jak
//   produkty, bez any
// - typ wyniku to Record<string, number>
// - zestawienie robisz dwa razy tą samą funkcją: raz po statusie, raz po kurierze
//
// PRZYKŁADY
// countByKey(orders, (order) => order.status)   ->  { paid: 3, pending: 1 }
// countByKey(orders, (order) => order.courier)  ->  { DPD: 2, InPost: 2 }
