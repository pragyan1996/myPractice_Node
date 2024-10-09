

var person = {
    name: "Pragyan"
}

// console.log(person);
// console.log(window);
// console.log(this);

function sayHi() {
    console.log(this);
}
// sayHi()


var person = {
    name: "Utkarsh",
    age: 20,
    sayHi: function () {
        console.log(this);
        console.log(`my name is ${this.name} and I am ${this.age} years old`);
    }
}

// person.sayHi();

//this does not goes with arrow functions

const add = (a, b) => {
    console.log(this);
    return a + b;
}

console.log(add(10, 2))

const obj = {
    name: 'Pragyan',
    age: 28,
    sayHi: () => {
        console.log(this);
        console.log(`my name is ${this.name} and I am ${this.age} years old`);
    }
}

function obj2() {
    let name = 'Nishant', age = 27;
    obj.sayHi();
}

obj2()