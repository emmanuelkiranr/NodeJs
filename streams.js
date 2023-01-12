// Streams allow us to start using the data, before it is finished loading.
// ie even before the data is read/written we can start executing the callback fn which otherwise would only execute once the
// data is completely read/written

/*
The read/fetched data is returned to the client from the server in small packets called buffer, once a buffer is filled it
is sent and we can use that buffer even before all the rest of the buffers are received. This is how netflix and other video
streaming platforms works. Instead of read/fetching all data at once they receive it in small packets 
*/

import fs from "fs";

const readStream = fs.createReadStream("./dummy.txt", { encoding: "utf-8" }); // The file will be automatically in readable format
// without sterm this is like:
// fs.readFileSync("./dummy.txt", "utf-8", (err, data) => {
//   console.log(data);
// });

const writeStream = fs.createWriteStream("./dummy2.txt");

// we are listening to data event using the .on method which is an event listener
// here data is a small chunk of data that we read from the file, once we get it we fire the fn and get access to that data
readStream.on("data", (chunk) => {
  console.log("Small data received");
  console.log(chunk);
  writeStream.write("\n New Chunk data read \n");
  writeStream.write(chunk);
});

// If we are writing the same data that we read from a file then we use pipe
readStream.pipe(writeStream);
