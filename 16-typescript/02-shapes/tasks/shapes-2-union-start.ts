////////
//// Blok 2, zadanie 2: cztery zakończenia zwrotu
////////
//
// KONTEKST BIZNESOWY
// Klient złożył cztery zgłoszenia zwrotu. Sklep każde już zamknął, ale inaczej: jednemu
// oddał pieniądze, drugiemu wysłał inny rozmiar, trzeci poszedł do naprawy, czwartemu
// odmówił. Panel klienta pokazuje te cztery sprawy jedna pod drugą, po jednej linii.
//
// DANE
// Cztery zgłoszenia. W każdym stoi numer returnId i pole outcome, które mówi, jak sklep
// zakończył sprawę. Reszta pól zależy od tego zakończenia i w danym zgłoszeniu zawsze jest:
//   { outcome: "refunded",  returnId: 4101, refundedPln: 249 }
//   { outcome: "exchanged", returnId: 4102, replacementSize: "M" }
//   { outcome: "repaired",  returnId: 4103, repairDays: 14 }
//   { outcome: "declined",  returnId: 4104, declineReason: "ślady użytkowania" }
//
// USER STORY
// Jako klient chcę w panelu jedną linię na każde zgłoszenie, żeby od razu wiedzieć,
// co sklep zrobił z moim zwrotem.
//
// KRYTERIA AKCEPTACJI
// - typ zgłoszenia to unia czterech kształtów, po jednym na każde outcome z sekcji DANE
// - we wszystkich czterech stoi to samo pole outcome, a w nim jedna z tych czterech nazw
// - w "refunded" jest kwota refundedPln, w "exchanged" replacementSize, w "repaired"
//   repairDays, w "declined" declineReason; w danym kształcie to pole jest wymagane
// - funkcja dostaje jedno zgłoszenie i zwraca komunikat z numerem zgłoszenia
// - funkcja ma jawny typ zwracany string
// - funkcja rozpoznaje zakończenie switchem po polu outcome
// - aplikacja bierze listę zgłoszeń, zamienia każde na komunikat i wypisuje listę
// - gdy do unii dopiszesz piąte outcome, a w switchu nie dodasz dla niego gałęzi,
//   TypeScript ma zgłosić błąd
//
// PRZYKŁADY
// { outcome: "exchanged", returnId: 4102, replacementSize: "M" }
//   ->  "Zwrot 4102: wysyłamy rozmiar M"
//
// Program wypisuje:
//   Zwrot 4101: oddajemy 249 zł
//   Zwrot 4102: wysyłamy rozmiar M
//   Zwrot 4103: naprawa potrwa 14 dni
//   Zwrot 4104: odmowa, ślady użytkowania
