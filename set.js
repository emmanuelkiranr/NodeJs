console.log("Emmaneul Kiran R");
setTimeout(() => {
  console.log("Age: 22");
}, 1000); // we know this statement has delay so we make it async using
// 3 ways to make a fn async - async, promise, set

/**All the sync statements are put into the call stact, executed and removed from it, but whenever the program sees an async fn
 * it puts it into an event loop and only after the call stack is completely empty[ie no more sync fns to be put into call stack], the
 * async fn is put into the call stack and executed[if there is any delay then the fn is put into the stack only after the delay].
 *
 * In case of setTimeout the delay is to represent after what time the fn is to be put into stack
 * In case of setInterval the delay is to represent after what all interval the fn should be put into stack(repeatedly put into stack after each delay)
 */
console.log("emmanuelkiranr");

console.log("Emmaneul Kiran R");
setInterval(() => {
  console.log("Age: 22");
}, 1000);
console.log("emmanuelkiranr");
