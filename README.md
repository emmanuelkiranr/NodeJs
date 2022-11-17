# Node Js

Setting up a node project using default properties

`npm init -y`

Setting up a node project using custom properties

`npm init`

properties

```
pkg name - node
version - 1.0.0 - major minor patch
description
entry point - (Default file thats executed while we point to parent directory - node .)
test command -
git repo -
keywords -
author - emmanuelkiranr
license - ISC
```

Once set up a package.json file will be generated with all the project details

To get details of all the objects type:

```
console.log(global);

// similar to window object in browser
```

Methods like setTimeout and all are part of global object so we don't have to exciplitely type global.setTimeout()

Process gives us access to the platform we run the application

```
console.log(process);

// similar to document in browser
```

### Directory and File name

Only works in commanJs so use the file extension cjs
(NOTE: Similarly for other situations to use ES6 use file extension .mjs)

```
console.log(___dirname); - absolute path of current folder the file is in

console.log(___filename); - absolute path of current folder with the file name
```

## Modules

modules is an object with many properties like exports(core module).

```
console.log(module);

console.log(module.exports);
This will return an object with all exported fns (check below)

```

There are 3 types of modules

- Core modules - Basic functionality and library that node gives us
- Local modules- The modules we write
- Npm modules - Installed as library

## Core modules

### Exports

To access a function declared in a file from another file, we need to export that fn first. Then we need to import/require it in the other file to access them

To export a function:

```
1. Set module.exports to that fn (Won't work if we want to export multiple fns)

module.exports = function greet() {
  console.log("Greetings");
};

This will add the greet fn to the exports obj so we can import it and access from other files

Since this is an interpreted language if there are multiple fns to be exported, in the exports object only the latest fn will be avalible all previous fns will be overwritten

1.1 To export multiple fns: use an id(same as fn name)

module.exports.greet = function greet() {
  console.log("Greetings");
};

module.exports.sayHi = function sayHi() {
  console.log("Hello");
};

(Note: We can replace module.exports with exports or exports.id_name, since both are same)

exports.sayHi = function sayHi() {
  console.log("Hello");
};

1.2 To import it to a different file:

const imp = require("./path");
imp.greet();
imp.sayHi();

2. If we have a lot of fns, instead of writing module.exports for every function individually we can create a object for that:

2.1 Calling multiple fns without using Id:

function greet() {
  console.log("Greetings");
}

function sayHi() {
  console.log("Hello");
}
module.exports = {
  greet,   - if the key and value names are same then just pass the value
  sayHi, - putting bracket will actually call the function
};

2.2 Destructuring - import multiple different things from a file

const age = [10, 20, 34];
const people = [bla, bla, ..]

const {age, people} = require(./path);
// Has to be same name as the exporting thing

3. In new versions of node to export a fn from a file we use the export keyword,
For that add "type": "module" in package.json

export default fn_name;

export default {fn_name1, fn_name2}

3.1 To import those fns, we use import instead of require

import { fn1_name } from "./path.mjs"; - import is a promise

or

import sec from "./path";

sec.fn_name1();


4. To display all the fns in the exports object in the form of table

console.table(imp);

```

### Creating an object and exporting it to a different file (ES6)

```
file1.js

let obj = {
  id: 1,
  email: null
};

obj.name = "emmanuelkiranr";
obj.age = 20;

export default obj;


file2.js
import imp from "./index.js";
console.log(imp);

```

[Link](https://github.com/emmanuelkiranr/NodeJs/commit/0a9bf7a3b05ea027fbe7fc0dd2cd7955c8d08d61)

### Writing scripts

In package.json file we can add custom scripts that can be run with the npm cmd

```
"start": "echo \"Running Node App\" && node imports.js",

run: npm start
```

### FileSystem fs

It is a core module to operate on files. Type fs. to see the supported options

```
import fs from "fs";

There are 2 ways to read/write - synchronous and asynchronous.

sync - Program exe is held until the data is received.

async - Program continues its execution, the data fetching process happens in the background. We use a callback fn with async read/write to get/use the received data.

sync write/read

fs.writeFileSync("data.json", "string");
// any below code will not be executed until this writeFileSync completes its execution

var content = fs.readFileSync("data.json");
console.log(content); // returns a buffer so use.toString();

async read/write

fs.writeFile("data-async.json", string, () => {
  console.log("File saved successfully");
});
// any below code will be executed while the writeFile is executed in the background. When writeFile completes its exe the fn here is called.


fs.readFile("data.json", (err, data) => {
  console.log(data);
});

other cmds

fs.mkdir("./path", (err) => {});
fs.rmdir("./path", (err) => {});
fs.existsSync("path")
fs.unlink("./path", (err) => {}) // delete file
```

To combact the issues of asynchronous reading we use streams [here](link)

### To get response from API using core and npm module

### HTTP (core)

```
import http from "./https"

http.get("https://reqres.in/api/users", (res) => {
  let content = "";
  console.log(res); // not the result but an object

  res.on("data", (data) => {
    console.log(data.toString());
  });

  res.on("end", () => {
    console.log(content);
  });

  res.on("error", (err) => {
    console.log("error occured");
  });
});
```

- http.get() - Get method - Sends a get request to the api. (The response will be an object, we can get the data from the data property of the response object)
<!-- Add call back details -->
- Once the response is received we pass it as an argument to the function for further processing

- .on method - This method is used to listen to events called when our app receives msg from the server. It is used to perform some operation on the received response object. ["on" receiving the response(data, error etc) do this "fn"]

- data - We take the data from the response for further operation
- end - On connection end
- error - When a error occurs in the request like network error etc

(NOTE: The data is received in chunks ie part by part so to display all data at a time append it as soon as it is recived)

### NPM Modules

Libraries build by 3rd parties can be used in our project by installing them using the `npm install` command.

```
npm install pkg_name;

// To uninstall
npm uninstall pkg_name;
```

For dev dependencies (after development they are not needed)

```
npm install --save-dev pkg_name;
```

- Use -g flag for global install/uninstall

The modules of the npm packages will be in the node_modules directory.

### readline-sync

```
// npm install readline-sync;
let name = rls.question("Enter your name ");
let age = rls.questionInt("Enter your age");

console.log(name);
console.log(age);
```

### Axios

```
npm install axios;
```

This will add the pkg and version details to the package.json file and also to the package-lock.json file - this file is used to install the correct version of the pkgs while other devs run `npm install` in future

```
import axios from "axios";

axios.get("https://reqres.in/api/users").then(function (res) {
  console.log(res.data);
});
```

Here we use axios instead of http, here the get request returns a promise, so we don't use a callback function like (res) => {} instead we use .then

Ask user which response page is required, then fetch that page and write to a file

```

import axios from "axios";
import fs from "fs";
import rls from "readline-sync";

let page = rls.question("Enter page num: ");

axios.get(`https://reqres.in/api/users?page=${page}`).then((res) => {
  let json = JSON.stringify(res.data.data);
  if (`${page}` == 1) {
    fs.writeFileSync("./json/one.json", json);
  } else {
    fs.writeFileSync("./json/two.json", json);
  }
});
```
