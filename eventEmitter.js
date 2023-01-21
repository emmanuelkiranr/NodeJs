import events from "events";

let emitter = new events.EventEmitter();

// start listening to events before it's emitted - or else the predefined emits won't work only the terminal would work
// this is because we started listening after the predefined events are emitted
emitter.on("Message", (message, user) => {
  // listening to an event
  console.log(`${message} by ${user}`);
});

// these are predefined events being emitted
emitter.emit("Message", "Hello World", "Emmanuel"); // emitting an event which is listened by the above fn
emitter.emit("Message", "Hello", "Godwin");

// to emit events directly from the terminal

process.stdin.on("data", (data) => {
  let input = data.toString().trim();
  if (input == "exit") {
    emitter.emit("Message", "Good Bye!", "Terminal");
    process.exit();
  } else {
    emitter.emit("Message", input, "Terminal");
  }
});
