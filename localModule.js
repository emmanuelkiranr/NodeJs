import readline from "readline"; // its a wrapper around process.stdin and stdout
import { EventEmitter } from "events"; // Destructuring imports

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function collectAnswers(questions, done) {
  let answers = [];

  const emitter = new EventEmitter();

  function answered(answer) {
    emitter.emit("Answer", answer);
    // eventhough events are emitted we need to listen to them if we need to print or do anything - use .on in test.js
    answers.push(answer);
    if (answers.length < questions.length) {
      rl.question(questions[answers.length], answered);
    } else {
      return done(answers);
    }
  }
  rl.question(questions[0], answered);
  return emitter;
}

export default collectAnswers;
