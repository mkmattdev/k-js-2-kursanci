////////
//// 1. setTimeout, czyli kod, który wykona się później
////////
{
  // setTimeout przyjmuje funkcję oraz liczbę milisekund i natychmiast oddaje sterowanie
  // kolejnym instrukcjom. Przekazaną funkcję wywołuje później środowisko, czyli Node
  // albo przeglądarka, dlatego kod stojący pod setTimeout wykonuje się przed nią.

  console.log("Zamawiam kawę");

  setTimeout(() => {
    console.log("Kawa gotowa"); // wypisze się jako ostatnie w tej sekcji
  }, 1000);

  console.log("Czytam gazetę");

  // setTimeout nie zatrzymał wykonania: "Czytam gazetę" pojawiło się przed "Kawa gotowa".
}

// Sposoby pracy z asynchronicznością
// 1 sposób - callbacki (funkcje zwrotne)
{
  const KNOWN_USER_ID = 1;
  const MISSING_USER_ID = 999;
  const USER_DELAY_MS = 4000;
  const POSTS_DELAY_MS = 3000;
  const COMMENTS_DELAY_MS = 5000;

  const getUserByCallback = (userId, onDone) => {
    setTimeout(() => {
      if (userId !== KNOWN_USER_ID) {
        onDone(new Error(`Nie ma użytkownika ${userId}`));
        return;
      }

      console.log("Pobrano użytkownika: Anna");
      onDone(null, { userId, name: "Anna" });
    }, USER_DELAY_MS);
  };

  const getPostsByCallback = (userId, onDone) => {
    setTimeout(() => {
      console.log("Pobrano posty: 1");
      onDone(null, [
        { postId: 11, title: "Pierwszy post" },
        { postId: 12, title: "Drugi post" },
      ]);
    }, POSTS_DELAY_MS);
  };

  const getCommentsByCallback = (postId, onDone) => {
    setTimeout(() => {
      console.log("Pobrano komentarze: 1");
      onDone(null, [
        { commentId: 101, text: "Świetny wpis!" },
        { commentId: 102, text: "Tragedia..." },
      ]);
    }, COMMENTS_DELAY_MS);
  };

  getUserByCallback(KNOWN_USER_ID, (userError, user) => {
    if (userError) {
      console.log(`Błąd: ${userError.message}`);
      return;
    }

    getPostsByCallback(user.userId, (postsError, posts) => {
      if (postsError) {
        console.log(`Błąd: ${postsError.message}`);
        return;
      }

      getCommentsByCallback(posts[0].postId, (commentsError, comments) => {
        if (commentsError) {
          console.log(`Błąd: ${commentsError.message}`);
          return;
        }

        console.log("Komentarze", comments);
      });
    });
  });
}
