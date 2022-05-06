const name = 'yoshi';
console.log(name);

// function "greet" takes in "name"
// ${} syntax allows us to directly output the variable "name"
const greet = (name) => {
    console.log(`hello, ${name}`);
}

greet('mario');
greet('peach');
