// GAINING ACCESS TO ALL ELEMENTS IN AN IMPORTED FILE
const group = require('./people') 
// "./" tells us to look in the current directory
// we are importing the "people.js" file into "modules"

// we can access elements in people.js
console.log(group.people, group.ages);


// GAINING ACCESS TO SELECT ELEMENTS OF AN IMPORTED FILE
const {people} = require('./people') 
// we only gain access to the const "people" from people.js
// group and age are undefined here

console.log(people);