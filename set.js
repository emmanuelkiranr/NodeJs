// console.log("Emmaneul Kiran R");
// setTimeout(() => {
//   console.log("Age: 22");
// }, 1000); // we know this statement has delay so we make it async using
// 3 ways to make a fn async - async, promise, set

/**All the sync statements are put into the call stact, executed and removed from it, but whenever the program sees an async fn
 * it puts it into an event loop and only after the call stack is completely empty[ie no more sync fns to be put into call stack], the
 * async fn is put into the call stack and executed[if there is any delay then the fn is put into the stack only after the delay].
 *
 * In case of setTimeout the delay is to represent after what time the fn is to be put into stack
 * In case of setInterval the delay is to represent after what all interval the fn should be put into stack(repeatedly put into stack after each delay)
 */
// console.log("emmanuelkiranr");

// console.log("Emmaneul Kiran R");
// setInterval(() => {
//   console.log("Age: 22");
// }, 1000);
// console.log("emmanuelkiranr");

const waitTime = 3000;
console.log(`setting a ${waitTime / 1000} second delay`);
const timerFinished = () => {
  clearInterval(interval); // to exit the exe after 3 sec
  console.log("done");
};
let time = setTimeout(timerFinished, waitTime); // execute the fn after 3 sec
// the time fn is automatically called we don't want to invoke it

const waitInterval = 500;
let currentTime = 0;

// making the waiting time log into the console - the time is dynamically updated

const loggingFn = () => {
  currentTime += waitInterval; // now the current time is same as the waitInterval for the first exe
  // currentTime represents the real time in seconds since we started waiting
  let progress = Math.floor((currentTime / waitTime) * 100);
  process.stdout.clearLine(); // overwrite the last line so that we can rewrite the progress without duplicate writing it
  process.stdout.cursorTo(0);
  process.stdout.write(`waiting ... ${progress}%`);
  // console.log(`waiting for ${currentTime / 1000} seconds`);
};
let interval = setInterval(loggingFn, waitInterval); // executes the fn after every 3 second interval

// Now for the above 3 sec delay using setTimeout will have a visual representation on when the 3 sec is established

// progress bar - useful to determine how far the completion of an asynchronous process has happened
