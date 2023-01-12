## Callback and Promise

### Basic function props:

We can assign a named or annonymous fn to a variable and call it using the variable name

```
let greet = function myName(name) {
  console.log(name);
};

or

let greet = (name) => {
  console.log(name);
};

greet("Hello");
```

Passing fn as parameter

```
function cb(func) {
  func();
}

// If fn cb was stored in another variable like above then the below code won't work

cb(function () {
  // fn without a name, anonymous fn
  console.log("123");
});
```

The fn call cb passes its parameter fn to its fn definition ie to func, so inside the definition if we need to call the fn, we only need to use the param name as fn call(since we assigned that fn to the param variable), It would search for its fn definition which is in the fn call cb and executes it

Example:

```
function icecream(makeicecream, flavour, flavours) {
  setTimeout(() => {
    makeicecream(flavour);
  }, flavours.kiwi);
}
const flavours = { kiwi: 6000, pineapple: 7000 };

icecream(
  function (flavour, flavours) {
    console.log(`${flavour} flavoured icecream`);
  },
  "kiwi",
  flavours
);

```

- Firstly fn call is executed ie icecream
- The first arg, the anom fn is put into makeicecream and the second arg kiwi is put into the flavour param of the fn definition of icecream
- Now makeicecream has the anom fn's definition so now we can use makeicecream as a fn call to execute that anom fn by passing in the flavour kiwi as argument.
- To mimic the async situation we use setTimeout whose second arg is passed and accessed from the object

Example: working of setTimeout

```
function settimeout(func, delay) { //imagine this is the fn definition of setTimeout
  if (delay == 0) {
    func();
  } else {
    delay--;
  }
}

setTimeout(function () {
  console.log("something");
}, 0);
```

### Sync and Async

- Sync - one after other (Directly put into call stack in the execution context)
- Async - (put into the event loop until call stack is free) Async is used in situations where a delay is expected(use wisely), eg of delay occurance tasks: console.log, I/O, fetch data from a server, write to disk

  (NOTE: 3 ways to make a fn async - async, promise, set)

Example replicating an async operation using setTimeout/setInterval

```
console.log("Emmaneul Kiran R");
setTimeout(() => {
  console.log("Age: 22");
}, 1000); // we know this statement has delay so we make it async using setTimeout
console.log("emmanuelkiranr");
```

All the sync statements are put into the call stack, executed and then removed, but whenever the program sees an async fn, it puts it into an event loop and only after the call stack is completely empty[ie no more sync fns to be put into call stack], the async fn is put into the call stack and executed[if there is any delay then the fn is put into the stack only after the delay].

```
console.log("Emmaneul Kiran R");
setInterval(() => {
  console.log("Age: 22");
}, 1000);
console.log("emmanuelkiranr");
```

- In case of setTimeout the delay represents after how much time the fn is to be put into stack
- In case of setInterval the delay represents the time interval after which the fn should be put into stack(repeatedly put into stack after each delay) [To clear an interval use clearInterval]

Another way to work with node sync is using the event listner

```
process.on("exit", () => { - The callback is triggered only when the exit event happens
  process.stdout.write("\n\n");
  process.stdout.write(
    `Name: ${answers[0]}\nAge: ${answers[1]}\nJob: ${answers[2]}`
  );
});
```

Using setTimeout and setInterval to see the completion of a async process in the form of progress bar [code](https://github.com/emmanuelkiranr/NodeJs/blob/main/set.js)

### Callback

Callback is a fn that is passed into another fn and called inside it, to complete some action and then be used later by the outer fn when a condition is met [in below eg the condition is delay]

How callback works:

```
function set() {
  let name = "emmanuel";
  console.log(name);
}
setTimeout(set, 2000);
```

Callback is like this, instead of passing the "set" we directly pass the fn body of set itself without the fn name

```
setTimeout(() => {
  let name = "emmanuel";
  console.log(name);
}, 2000);
```

Here the callback fn is passed inside the setTimeout method and is executed after 2 sec delay

```
function set() {
  let name = "emmanuel";
  console.log(name);
}
setTimeout(set, 2000);
```

NOTE: while passing a fn as param to another fn don't put (), else it gets executed first before the fn call itself is executed, eg `setTimeout(set());`. Here code execution will start from the inner bracket so here first the set() will execute and then the setTimeout().

If we need the ( ) to pass args etc. then to make it a callback with ( ):

```
setTimeout(() => set(), 2000)
setTimeout(() => set(args_ifAny), 2000)

For nested callbacks
setTimeout(() => set(() => set1(args_ifAny), 2000)
```

#### else

```
setTimeout(set, 2000);
```

Here while passing set as arg to executeTask the fn body of set is being passed so in setTimeout fn the set arg represents the entire set fn

### Promise

```
console.log(1);

setTimeout(() => {
  let name = "emmanuel";
  console.log(name);
}, 2000);

console.log(2);
```

Here we mimic an async use case using setTimeout method, which takes a callback fn as argument & a time.

- Consider a scenario where the callback is fetching huge data from database and also have to process this data to pass it to the below code statements(these statements are sync).
- In this case we can write nested callbacks where the response of first callback is send to the callback nested below it, which processes this response and passes it to the next callback inside and so on.
- This is called callback hell. This is slower and if any error occurs anywhere then the entire nested callbacks will fail and the code itself will fail.
- To avoid this problem we use promise.

The promise is an object (console log it), representing the completion or rejection of the async operation
[I promise to get back to you asap].

The promise has 2 results, either it is completed ie resolved or it is failed ie rejected

```
function prom() {
  return new Promise((res, rej) => {
    let name = "emmanuelkiranr";
    if (name === "emmanuelkiranr") {
      res("Success");
    } else {
      rej("failed");
    }
  });
}

// execution starts here
prom()
  .then((msg) => {
    console.log(msg);
  })
  .catch((msg) => {
    console.log(msg);
  });

  <------->

  imagine
  let res = (msg) => {console.log(msg)};
  res("success");
```

- The promise once defined is in a pending state and we have to define a callback called an executer which takes 2 vars res and rej that decides when to resolve or rej the promise.

- The consumer uses the .then method which waits for the async value to be fulfilled, once fulfilled we'll call the fn(inside then) and pass this value as an argument.

- We fulfill the promise by calling resolve, if error we use reject to process .catch method

- To process regardless of the both above possibilities we use .finally()

Here then is the success callback so the var msg is the result of what is resolved .So if we are fetching data from api
then res will be the resultant of the get request. we can use that result in the then statement for further processing

So basically the res will call the then and the rej will call catch method see eg: [here](https://github.com/emmanuelkiranr/NodeJs/blob/main/callProm.js)

example: [one](https://github.com/emmanuelkiranr/NodeJs/blob/main/promise.js), [two](https://github.com/emmanuelkiranr/NodeJs/blob/main/promise2.js)
