import http from "https";
import fs from "fs";

let options = {
  hostname: "reqres.in",
  port: 443,
  path: "/api/users",
  method: "GET",
};
// or directly use the get method using .get
// http.get("https://reqres.in/api/users", (res) => {})

const request = http.request(options, (res) => {
  let content = "";
  // console.log(res); // not the result but an object

  res.on("data", (data) => {
    // data is received in chunks so append it one by one
    content += data;
    console.log(data.length);
    // console.log(data.toString());
  });

  res.on("end", () => {
    let result = content.toString();
    fs.writeFile("./json/http.json", result, (err) => {
      if (err) {
        throw err;
      } else {
        console.log("File saved successfully");
      }
    });
  });

  res.on("error", (err) => {
    console.log("error occured");
  });
});

request.end();
