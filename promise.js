function readFileSync(fileName) {
  // since promise is a class use new
  var p = new Promise((res, rej) => {
    // return type of promise is void so dont give it
    console.log("Reading file..");
    var content = "This is content";
    res(content); // only called after all the execution is over
  });
  return p; // returns promise not content
}
/*
Since when js sees this fn returns promise then it puts the task in event queue. It doesnt check it again
To check it again for the result of promise use .then. Here content is a promies {console log it }. 
To get the content use .then
*/

var content = readFileSync("myFile.txt"); // promise is stored in content hover over it

// only executed when promise is resovled
content.then((r) => {
  // value of r is content
  console.log(r);
});

// imagine
let res = (r) => {
  console.log(r);
};
res(content);

console.log("completed");
