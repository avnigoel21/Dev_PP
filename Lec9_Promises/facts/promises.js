const fs = require("fs");

// B gets a pending promise          // A -> initially returns a pending promise
let pendingPromise = fs.promises.readFile("./f1.txt"); // 100gb => 10 min

console.log(pendingPromise); // tells the status of promise
// pendingPromise => Promise object whose state is pending !!!


// success callback => scb attached to pending promise
pendingPromise.then(function(data){
    console.log("Inside then ka callback i.e scb");
    console.log(data + ""); //data in the form of string
    console.log(data); //data in the form of low level data
    console.log(pendingPromise); // tells the status of promise
});


// failure callback => fcb attached to pending promise
pendingPromise.catch( function(error){
    console.log("Inside catch ka callback i.e fcb");
    console.log(error);
    console.log(pendingPromise);
});

