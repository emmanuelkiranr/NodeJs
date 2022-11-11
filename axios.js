/* Here we use axios instead of http, here the get request returns a promise*/

import axios from "axios";
import fs from "fs";
import rls from "readline-sync";

let page = rls.question("Enter page num: ");

axios.get(`https://reqres.in/api/users?page=${page}`).then((res) => {
  // returns a promise[hover over .get method] so we don't use a callback function like (res) => {} instead we use .then
  // hover over .then it takes a callback fn which inturn takes a resolve and rejection as params
  // console.log(res.data.data);
  let json = JSON.stringify(res.data.data);
  // To write an object to any file we have to convert it to a string format
  if (`${page}` == 1) {
    fs.writeFileSync("./json/one.json", json);
  } else {
    fs.writeFileSync("./json/two.json", json);
  }
});
