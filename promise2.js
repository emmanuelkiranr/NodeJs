function task(age) {
  return new Promise(function (res, rej) {
    setTimeout(() => {
      if (age < 18) {
        rej("you are not allowed");
      } else {
        res("Emmanuel");
      }
    }, 2000);
  });
}

task(20)
  .then(function (name) {
    return name + " sir";
  }) // this also returns a promise which is resolved in thins case so we call res
  .then(function (res) {
    console.log(res);
  })
  .catch(function (error) {
    console.log(error);
  }); // method chaining
console.log(2);

// res = (name) => {
//   return name + " sir";
// }
// res("Emmanuel")
