// import readline from "readline"; // its a wrapper around process.stdin and stdout
import collectAnswers from "./localModule.js";
// let rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// }); // interface has an input and output

let questions = ["Your name: ", "Your age: ", "Your job: "];

// rl.question("Your name: ", (answer) => {
//   console.log(answer);
// }); - for single question

// create a function to ask multiple questions

// function collectAnswers(questions, done) {
//   let answers = [];

//   function answered(answer) {
//     answers.push(answer);
//     if (answers.length < questions.length) {
//       rl.question(questions[answers.length], answered);
//     } else {
//       return done(answers);
//     }
//   }
//   rl.question(questions[0], answered);
// }

collectAnswers(questions, (answer) => {
  console.log(`Thank you for answers`);
  console.log(answer);
  process.exit();
}).on("Answer", (data) => {
  // the event name should be same as what is emitted
  console.log(`You answered > ${data}`);
}); // - now collectAnswers returns an event so use .on to listen to it
