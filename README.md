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

Once set up a package.json file will be generated with all the project & dependency package details

In node we have global object (which is similar to the window object in browser):

```
console.log(global);

for (let key in global) {
  console.log(key);
}

output - key

global
queueMicrotask
clearImmediate
setImmediate
structuredClone
clearInterval
clearTimeout
setInterval
setTimeout
atob
btoa
performance
fetch
```

Methods like setTimeout and all are part of global object so we don't have to exciplitely type global.setTimeout()

Process gives us access to the platform we run the application (similar to document object in browser)

```
console.log(process);

console.log(process.argv);

output - node global
[ '/usr/local/bin/node', '/Users/emmanuel/Documents/MERN/Node/global' ]
// location of node, location of the file

output - node global --user Emmanuel --age 23

[
  '/usr/local/bin/node',
  '/Users/emmanuel/Documents/MERN/Node/global',
  '--user',
  'Emmanuel',
  '--age',
  '23'
]

To extract the value of flags using process.arg

function extract(flag) {
  let postindexof = process.argv.indexOf(flag) + 1;
  return process.argv[postindexof];
}

const user = extract("--user");
const age = extract("--age");

console.log(user);
console.log(age);
```

using stdout and stdin with process [code](https://github.com/emmanuelkiranr/NodeJs/blob/main/readline-sync.js)

### Directory and File name

Only works in commanJs so use the 2nd method in ES6 - Used to import other code into our files

```
console.log(___dirname); - absolute path of current folder the file is in

console.log(___filename); - absolute path of current folder with the file name

To extract filename:

import path from "path";
console.log(`The file name is ${path.basename(__filename)}`);

To join multiple path - path.join(__dirname, "path 1", "path 2")
```

2nd method (ES6)

```
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

```
import util from "util"; - to log details like timestamp

utils.log(path.basename(__filename));

import v8 from "v8"; - to get info of the memory used etc

uitl.log(v8.getHeapStatistics());
```

## Event Emitter

```
import events from "events";

let emitter = new events.EventEmitter();
```

[code](https://github.com/emmanuelkiranr/NodeJs/blob/main/eventEmitter.js)

Program to get user input to multiple questions using readline and separate the logic into diffeernt module and also emit an event when the user answers an question.
[code](https://github.com/emmanuelkiranr/NodeJs/blob/main/test.js)

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

npx - to run executables

### FileSystem fs

It is a core module to operate on files. Type fs. to see the supported options

There are 2 ways to read/write - synchronous and asynchronous/blocking and non-blocking

sync - process exe is held until the data is received.

async - process is put into event loop until all sync process completes their exe, after that it is put to the call stack. We use a callback fn with async read/write to get/use the received data.

```
import fs from "fs";

sync write/read

fs.writeFileSync("data.json", "string"); - all below code waits until this process is completed

var content = fs.readFileSync("data.json");
console.log(content); // returns a buffer so use.toString(); or mention the text encoding fmt - "UTF-8"

async read/write

fs.writeFile("data-async.json", string, () => {
  console.log("File saved successfully");
}); - any below code will be executed

fs.readFile("data.json", "UTF-8", (err, data) => {
  console.log(data); - This data in callback is similar to writing let data = fs.readFileSync("data.json"); in sync reading. In async the data is received inside the callback
});

other cmds

Make a directory if it doesn't exist

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

renaming/ moving files

fs.renameSync("testing.js", "test.js"); // similar to folder as well - specify the path

fs.rename("json/file.js", "../Node/file.js", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("File moved successfully");
  }
});

fs.rmdir("./path", (err) => {}); - delete empty directory

fs.unlink("./path", (err) => {
  if(err){
    console.log(err)
  } else {
    console.log("Deleted Files")
  }
}) // delete file also - fs.unlinkSync("filename)
```

```
To list the directories
let dir = fs.readdirSync("./");
console.log(dir);

fs.readdir("./", (err, dir) => {
  if (err) {
    throw err;
  }
  console.log(dir);
}); - async reading is better since it allows us to do other things while this is happening
```

To use async await with async filesystem instead of the callback use `util.promisify`

```
import fs from "fs";
import util from "util";

const fsreadFile = util.promisify(fs.readFile);

...
// inside async function
const data = await fsreadfile(filepath);

// instead of
fsreadfile(filepath, (err, data) => {})
```

To combact the issues of asynchronous reading we use streams [here](https://github.com/emmanuelkiranr/NodeJs/blob/main/streams.js)

prog - Writing users questions and answers to another file using write stream [code](https://github.com/emmanuelkiranr/NodeJs/blob/main/readline-sync.js)

### To get response from API using core and npm module

### HTTP (core)

HTTP - to request to sites without security certificates, HTTPS - request to sites with certificates

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

### HTTPS module

```
const url = "https://en.wikipedia.org/wiki/Earth";

const request = https.get(url, (res) => {

  let response = fs.createWriteStream("./json/https.html"); -  since data is received in chunks use writestream

  console.log(res); - eventhough res is an object when we write it its automatically in the correct data format

  res.pipe(response); - since we are writing the same data to the file without any modification we can use `pipe`

  res.on("end", () => {
    console.log("File saved successfully");
  });
});

request.end();
```

### NPM Modules

Libraries build by 3rd parties can be used in our project by installing them using the `npm install` command.

```
npm i pkg_name;

// To uninstall
npm uninstall pkg_name;
```

For dev dependencies (after development they are not needed)

```
npm install --save-dev pkg_name;

or

npm i pkg_name -D;
```

- Use -g flag for global install/uninstall

The modules of the npm packages will be in the node_modules directory.

To check if there's any outdated package in our directory/project
`npm outdated` use -g for global pkgs. Then run npm install on that package to update it.

The ^ symbol means any installing that dependency will be installing the latest version of minor and patch for that particular major update
The ~ " " latest version of the path for that particular major and minor update
Remove both to install the exact version.

Npm keeps a cache of our installed modules: `npm cache verify`
To clean it: `npm cache clean`.

Npm audit - automatically runs to make sure the packages we install are safe `npm audit`

If there is any issue run `npm audit --fix` of look at the audit and do `npm i` for each pkg one by one to find out which is causing the issue.

If we remove any unwanted packages directly from package.json, it's dependencies will still be available in node_modules.
check it using `npm ls`, it'll show extraneous for such packages. So to make the node_modules match our package.json run `npm prune`

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

## Stream

Build a node app to scrap a web file

```
import https from "https";
import fs from "fs";

https.get("https://letsencrypt.org/", (res) => {
  let writestream = fs.createWriteStream("./test.html");
  res.pipe(writestream); -  we are NOT waiting to receive the entire response before writing it
  res.on("end", () => {
    console.log("Data saved successfully");
  });
}); - since we are writing the same data that we write use pipe
```

We receive data from the response as small chunks, if we are reading/ writing this response using readFile/writeFile sync/async
then we have to wait until all the chunks are received from the response before we can operate on this response.

To overcome this we use streams, now we can start operating on the response even before we fully receive all the response.

To operate on a file even when it haven't fully read/ (still reading data form res/another file) the data/res, use createReadStream
Make that file use createReadStream type
Pass the name of the file we want to read
eg:

```
let readStream = fs.createReadStream("./test.html", { encoding: "utf-8" });
createReadStream(fileName) // this will read the fileName in CRS mode
```

We can use pipe to send this read data as it/ reading happens - createReadStream(fileName).pipe(res); // write to response

```
readStream.on("data", (chunk) => {
  console.log("Small data received");
  console.log(chunk);
  writeStream.write("\n New Chunk data read \n");
  writeStream.write(chunk);
});
```

here we are operating(writing) the data as we read it, otherwise we have to wait until we read the entire file before writing
like:

```
response = ""
 res.on("data", (data) => {
    response += data; // we have to wait until the res is completely in response before we can write it to a file
    fs.writeFile("./path", response, (err) => {})
});
```

To operate on a file which is still receiving data/ the data is being written on it, use createWriteStream -
make that file use createWriteStream type
pass to it the filename

eg:

```
let writestream = fs.createWriteStream("./test.html");
writestream.write(res);
```

we are writing the response to that file using writeStream, instead of writeFile/writeFileSync
