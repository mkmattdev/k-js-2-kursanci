  const users = [
    { id: 1, age: 20 },
    { id: 2, age: 17 },
    { id: 3, age: 40 },
  ];

  // Otrzymac tablice doroslych osob
  const MATURITY_AGE = 18;
  const maturedUsers = users.map((user) => {
    return user.age;
  }); // user.age === true
  console.log(maturedUsers);