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

if (fs.existsSync("NodeDir")) {
  console.log("Folder already exist");
} else {
  fs.mkdir("NodeDir", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Directory created successfully");
    }
  });
}

// writeFile and writeFileSync

// Writing the stringified output to a file
fs.writeFileSync("./json/data.json", string); // - ctrl is held until its finished
console.log("File saved successfully using sync"); // This will be printed after previous write

fs.writeFile("./json/data-async.json", string, (err) => {
  // To append to the file
  fs.appendFileSync(
    "./json/data-async.json",
    "// This is comment appended by Emmanuel"
  );
  // To say smtg after writing the file
  console.log("File saved successfully");
});

console.log("completed"); // This will be printed before the completion of previous write since its async and doesn't wait

// Read file

var content = fs.readFileSync("./json/data.json"); // returns a buffer
console.log(content.toString());

fs.readFile("./json/data.json", "UTF-8", (err, data) => {
  console.log(data);
});
// In both read and write of async the result is received later (since its a bg task) thats the reason we put them in a function
// so once the data is received it calls the fn specified

// listing directory

fs.readdir("./", (err, dir) => {
  if (err) {
    throw err;
  }
  console.log(dir);
});

// renaming / moving files

// fs.renameSync("testing.js", "test.js");

// moving files is same as renaming them with a different path specified

// fs.rename("json/file.js", "../Node/file.js", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File moved successfully");
//   }
// });

// To delete an non empty folder - firstly move the files to a different folder
// fs.readdirSync("./NodeDir").forEach((file) => {
//   fs.renameSync(file, `./Node/${file}`);
// });
// Returns an array of files so instead of storing and then accessing from a variable directly access it
