// // Callback
function watchTutorialCallback(callback, errorCallback) {
  // fn passed as arg to another fn - callback
  let userLeft = false;
  let userWatchingCatMeme = false;

  if (userLeft) {
    errorCallback({
      name: "User Left",
      message: ":(",
    });
  } else if (userWatchingCatMeme) {
    errorCallback({
      name: "User Watching Cat Meme",
      message: "WebDevSimplified < Cat",
    });
  } else {
    callback("Thumbs up and Subscribe");
  }
}

watchTutorialCallback(
  (message) => {
    console.log("success " + message);
  },
  (error) => {
    console.log(error.name + " " + error.message);
  }
);

// Promise
function watchTutorialPromise() {
  // promise don't have callbacks
  let userLeft = true;
  let userWatchingCatMeme = false;
  return new Promise((res, rej) => {
    // here res is the success callback and rej is the error callback
    if (userLeft) {
      rej({
        name: "User Left",
        message: ":(",
      });
    } else if (userWatchingCatMeme) {
      rej({
        name: "User Watching Cat Meme",
        message: "WebDevSimplified < Cat",
      });
    } else {
      res("Thumbs up and Subscribe");
    }
  });
}

watchTutorialPromise()
  .then((msg) => {
    // here then is the success callback so the var msg is the result of what is resolved .So if we are fetching data from api
    // then res will be the resultant of the get request. we can use that result in the then statement for further processing
    console.log(`success:  ${msg}`);
  })
  .catch((err) => {
    // and catch is the reject callback
    console.log(err.name + " " + err.message);
  });
