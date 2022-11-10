import axios from "axios";
import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the page", function (page) {
  axios
    .get(`https://reqres.in/api/users?page=${page}`)
    // returns a promise so we don't use a callback function like (res) => {} instead we use .then
    .then(function (res) {
      // console.log(res.data.data);
      const json = JSON.stringify(res.data.data); // To write an object to any file we have to convert it to a string format
      if (`${page}` == 1) {
        fs.writeFileSync("1.json", json);
      } else {
        fs.writeFileSync("2.json", json);
      }
      rl.close();
    });
});

/* Here we use axios instead of http, here the get request returns a promise*/
