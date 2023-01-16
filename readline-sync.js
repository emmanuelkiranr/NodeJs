// import rls from "readline-sync";

// let name = rls.question("Enter your name ");
// let age = rls.questionInt("Enter your age");
// console.log(name);
// console.log(age);

import fs from "fs";

let questions = ["What is your name", "What is your age", "What is your job"];
let answers = []; // write the answer along with the question to a new file using writestream

let writeStream;

function ask(i = 0) {
  process.stdout.write(`${questions[i]}\n`);
  process.stdout.write(">");
}

// the file is created once the user inputs the name
process.stdin.once("data", (data) => {
  // only once listens to the data event. This is also listening to data in the background (only for first time)
  // while the below event listerner is listening
  let name = data.toString().trim();
  let filename = `./${name}.md`;
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
  }
  writeStream = fs.createWriteStream(filename);
  writeStream.write(`Question answers for ${name} \n=========== \n`);
});

ask();

process.stdin.on("data", (data) => {
  // This listens for events all the time
  // answers.push(data.toString().trim());
  let answer = data.toString().trim();
  writeStream.write(`Question: ${questions[answers.length]}\n`);
  writeStream.write(`Answer: ${answer}\n`, () => {
    if (answers.length < questions.length) {
      ask(answers.length);
    } else {
      process.exit();
    }
  }); // since this is an async process, the value of answers.lenght inside writeStream is the value after the push()
  answers.push(answer);
});

process.on("exit", () => {
  writeStream.close(); // dont forget to close the stream
  process.stdout.write("\n\n");
  process.stdout.write(
    `Name: ${answers[0]}\nAge: ${answers[1]}\nJob: ${answers[2]}`
  );
});
