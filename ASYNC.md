## Callback and Promise

### Basic function props:

We can assign a named or annonymous fn to a variable and call it using the variable name

```
let greet = function myName(name) {
  console.log(name);
};
greet();
```

Passing fn as parameter

```
function cb(func) {
  func();
}

cb(function () {
  // fn without a name, anonymous fn
  console.log("123");
});
```

The fn call cb passes its parameter fn to its fn definition ie to func, so inside the definition if we need to call the fn, we only need to use the parma name as fn call, It would search for its fn definition which is in the fn call cb and executes it

Example:

```
function icecream(makeicecream, flavour) {
  makeicecream(flavour);
}

icecream(function (flav) {
  console.log(`${flav} flavoured icecream`);
}, "kiwi");
```

- Firstly fn call is executed ie icecream
- The first arg, the anom fn is put into makeicecream and the second arg kiwi is put into the flavour param of the fn definition of icecream
- Now makeicecream has the anom fn's definition so now we can use makeicecream as a fn call to execute that anom fn by passing in the flavour kiwi as argument

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
- In case of setInterval the delay represents the time interval after which the fn should be put into stack(repeatedly put into stack after each delay)

### Callback

Callback is a fn that is passed into another fn and called inside it, to complete some action and then be used later used by the outer fn when a condition is met [in below eg the condition is delay]

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
setTimeout(set);
```

Here while passing set as arg to executeTask the fn body of set is being passed so in setTimeout fn the set arg represents the entire set fn
