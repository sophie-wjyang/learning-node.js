// ALL FUNCTIONS AVAILABLE IN THE GLOBAL OBJECT
console.log(global);

// now we use global object methods

// SET TIMEOUT
// times out after 3 seconds
setTimeout(() => {
    console.log('timed out');
    clearInterval(int); // setInterval will stop outputting once timeout is reached (after 3 seconds)
}, 6000);

// SET INTERVAL
// outputs every second
const int = setInterval(() => {
    console.log('interval');
}, 1000);

// DIRECTORY AND FILE NAME
console.log(__dirname);
console.log(__filename);
