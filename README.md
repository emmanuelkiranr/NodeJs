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

Process gives us access to the platform we run the application
console.log(process);
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
};

obj.name = "emmanuelkiranr";
obj.age = 20;

export default obj;


file2.js
import imp from "./index.js";
console.log(imp);

```

### FileSystem fs

It is a core module to operate on files.

```
import fs from "fs";

There are 2 ways to read/write - synchronous and asynchronous.

sync - Program exe is held until the data is received.

async - Program continues its execution, the data retriving process happens in the background. We use a fn with async read/write to get/use the received data.

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

```

### Writing scripts
