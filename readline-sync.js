import rls from "readline-sync";

let name = rls.question("Enter your name ");
let age = rls.questionInt("Enter your age");
console.log(name);
console.log(age);

let questions = ["What is your name", "What is your age", "What is your job"];
let answers = [];

function ask(i = 0) {
  process.stdout.write(`${questions[i]}\n`);
  process.stdout.write(">");
}

ask();

process.stdin.on("data", (data) => {
  answers.push(data.toString().trim());
  if (answers.length < questions.length) {
    ask(answers.length);
  } else {
    process.exit();
  }
});

process.on("exit", () => {
  process.stdout.write("\n\n");
  process.stdout.write(
    `Name: ${answers[0]}\nAge: ${answers[1]}\nJob: ${answers[2]}`
  );
});
