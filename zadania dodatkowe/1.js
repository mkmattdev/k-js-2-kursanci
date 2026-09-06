////////
//// Zadanie
////////
{
  // Jako użytkownik systemu rezerwacji kina, chcę mieć możliwość przeglądania dostępnych miejsc, rezerwowania wybranych miejsc
  // oraz poznania całkowitego kosztu mojej rezerwacji, aby móc świadomie dokonać zakupu.
  // Szczegóły:
  // 	1.	Przeglądanie dostępnych miejsc:
  // 	•	Użytkownik widzi aktualny stan miejsc w kinie na początku procesu rezerwacji, z podziałem na rzędy.
  // 	2.	Rezerwacja miejsc:
  // 	•	Użytkownik może wpisać identyfikator miejsca, które chce zarezerwować (np. A1, B2).
  // 	•	Program sprawdza, czy miejsce jest dostępne.
  // 	•	Jeśli tak, miejsce zostaje zarezerwowane ('X'), a użytkownik otrzymuje informację o cenie biletu.
  // 	•	Jeśli nie, wyświetlany jest odpowiedni komunikat.
  // 	3.	Całkowity koszt:
  // 	•	Po każdej rezerwacji koszt dodaje się do całkowitej sumy.
  // 	•	Po zakończeniu procesu rezerwacji ("stop") wyświetlany jest całkowity koszt wszystkich zarezerwowanych miejsc.
  // 	4.	Zakończenie rezerwacji:
  // 	•	Użytkownik może zakończyć proces rezerwacji, wpisując "stop".
  // 	5.	Ceny biletów:
  // 	•	Ceny miejsc różnią się w zależności od rzędu: rząd A kosztuje 50 PLN, rząd B - 40 PLN, rząd C - 30 PLN.
  // Kryteria akceptacji:
  // 	•	Użytkownik może przeglądać listę dostępnych miejsc.
  // 	•	Użytkownik może zarezerwować miejsce, a koszt rezerwacji jest sumowany.
  // 	•	Po zakończeniu rezerwacji wyświetlany jest całkowity koszt.
  // 	•	Program informuje o niedostępności miejsca, jeśli jest ono już zarezerwowane lub nie istnieje.
  // 	•	Użytkownik może zakończyć proces rezerwacji wpisując “stop”.
  // Przykład działania (terminal):
  // Available seats:
  // A1 A2 A3
  // B1 B2 B3
  // C1 C2 C3
  // Please enter the seat number you want to reserve (OR type "STOP" to finish): B2
  // Reserved B2. Price: 40 PLN
  // Available seats:
  // A1 A2 A3
  // B1 X B3
  // C1 C2 C3
  // Please enter the seat number you want to reserve (OR type "STOP" to finish): B3
  // Reserved B3. Price: 40 PLN
  // Available seats:
  // A1 A2 A3
  // B1 X X
  // C1 C2 C3
  // Please enter the seat number you want to reserve (OR type "STOP" to finish): B3
  // The selected seat does not exist or is already reserved. Please try again.
  // Available seats:
  // A1 A2 A3
  // B1 X X
  // C1 C2 C3
  // Please enter the seat number you want to reserve (OR type "STOP" to finish): C2
  // Reserved C2. Price: 30 PLN
  // Available seats:
  // A1 A2 A3
  // B1 X X
  // C1 X C3
  // Please enter the seat number you want to reserve (OR type "STOP" to finish): STOP
  // Total reservation cost: 110 PLN
  // Session ending...
}
