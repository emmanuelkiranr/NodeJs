console.log(process.argv);

function extract(flag) {
  let postindexof = process.argv.indexOf(flag) + 1;
  return process.argv[postindexof];
}

const user = extract("--user");
const age = extract("--age");

console.log(user);
console.log(age);

import { fileURLToPath } from "url";
// import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
import path from "path";
console.log(`The file name is ${path.basename(__filename)}`);
