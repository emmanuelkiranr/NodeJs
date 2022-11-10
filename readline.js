import readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your name: ", (name) => {
  console.log(`${name}`);
  rl.close(); // closes the readline interface by emitting close event
});

rl.on("close", function () {
  console.log(`The msg you entered is displayed above`);
  process.exit(0);
});
