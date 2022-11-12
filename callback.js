console.log(1);
console.log(2);

function set() {
  let name = "emmanuel";
  console.log(name);
}
setTimeout(set, 2000);
// callback is like this, instead of passing the "set" we directly pass the fn body of set itself without the fn name

/*(NOTE: while passing a fn as para to another fn don't put () or else it gets executed first before the fn call itself is executed
setTimeout(set());
Code execution will start from the inner bracket so here first the set() will execute and then the setTimeout,

To make it callback when we need to use ( ) to pass any params:
setTimeout(() => set(), 2000)
setTimeout(() => set(args_ifAny), 2000)
setTimeout(() => set(()=> set(args_ifAny), 2000)

or

setTimeout(set);
Here while passing doThis as arg to executeTask the entire doThis() fn is being passed so in executeTask fn the task arg represents the entire doThis fn
*/

// Callback is a fn that is passed into another fn and called inside it, to complete some action
setTimeout(() => {
  let name = "emmanuel";
  console.log(name);
}, 2000);

console.log(3);
console.log(4);
console.log(5);

/** Here we mimic an async use case using setTimeout method, which takes a callback fn as argument & a time.
 * Consider a scenario where the callback is fetching huge data from database and also have to process this data to pass it to
 * the below code statements(these statements are sync).
 * In this case we can write a nested callback where the response of first callback is send to the callback nested below it, which process
 * this response and passes it to the next callback inside and so on. This is called callback hell. This is slower and if any error
 * occurs anywhere then the entire nested callbacks will fail and the code itself will fail.
 *
 * To avoid this problem we use callbacks inside of promise
 * This callback fn
 * is expecting a response
 */
