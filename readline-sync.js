import rls from "readline-sync";

let name = rls.question("Enter your name ");
let age = rls.questionInt("Enter your age");
console.log(name);
console.log(age);
