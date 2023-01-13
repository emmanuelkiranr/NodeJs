import https from "https"; // all https requests use port 443
import fs from "fs";

// let options = {
//   hostname: "en.wikipedia.org", // where we making request
//   port: 443,
//   path: "/wiki/Earth",
//   method: "GET",
// };
// The request header

// const request = https.get(options, (res) => {
//   let response = "";
//   res.setEncoding("UTF-8");
//   res.on("data", (data) => {
//     response += data;
//     console.log(data.length);
//   });

//   res.on("end", () => {
//     fs.writeFile("./json/https.html", response, (err) => {
//       if (err) {
//         throw err;
//       } else {
//         console.log("File saved successfully");
//       }
//     });
//   });
// });
// request.end();

// We can directly use get method, and since we are receiving data in chunks we can use writestream to write it to a file

const url = "https://en.wikipedia.org/wiki/Earth";

const request = https.get(url, (res) => {
  let response = fs.createWriteStream("./json/https.html");
  // since we are writing the same data to the file without any modification we can use `pipe`
  res.pipe(response);
  console.log(res);
  res.on("end", () => {
    console.log("File saved successfully");
  });
});

request.end();
