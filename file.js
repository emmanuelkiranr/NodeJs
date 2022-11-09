import fs from "fs";

var user = {
  fullName: "emmanuelkiranr",
  age: 22,
  phone: [123456, 789765],
};

// converting JSON to string
let string = JSON.stringify(user);
console.log(string);

// To check if a file exist in drive - existsSync
var exists = fs.existsSync("package.json"); // checks for the file in the same directory
console.log(exists);

// sync and async fns

// writeFile and writeFileSync

// Writing the stringified output to a file
fs.writeFileSync("data.json", string); // - ctrl is held until its finished
console.log("File saved successfully using sync"); // This will be printed after previous write

fs.writeFile("data-async.json", string, () => {
  // To say smtg after writing the file
  console.log("File saved successfully");
});

console.log("completed"); // This will be printed before the completion of previous write since its async and doesn't wait

// Read file

var content = fs.readFileSync("data.json"); // returns a buffer
console.log(content.toString());

fs.readFile("data.json", (err, data) => {
  console.log(data);
});
// In both read and write of async the result is received later (since its a bg task) thats the reason we put them in a function
// so once the data is received it calls the fn specified
