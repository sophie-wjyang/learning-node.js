// array of strings
const people = ['yoshi', 'peach', 'luigi', 'mario'];
const ages = [12, 13, 14, 15];

console.log(people); // when we run modules.js, people.js will also run (since we imported it), so this will automatically output

module.exports = {
    people, ages
}