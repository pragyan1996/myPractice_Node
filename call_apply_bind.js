/*
const parent = {
    health: 50,
    addHealth(a) {
        console.log(this.health + a);
    }
}

const child = {
    health: 20
}

parent.addHealth(20);//Normal method
//call: function.call(reference, parameter);
parent.addHealth.call(child, child.health);
//apply: same as call but with parameters in array
parent.addHealth.apply(child, [child.health]);

function print() {
    console.log(this);
}

let myObj = {
    a: 10
}

print.call(myObj);
*/

//Bind

let cap = {
    name: "Stieve",
    team: "Cap",
    petersTeam: function (mem1, mem2, ...otherMem) {
        console.log(`hay this is ${this.name} I am your neighbourhood spiderman and I belong to ${this.team}'s team`);
        console.log(`I am working with ${mem1}, ${mem2} and ${otherMem}`);
    }
}

let ironMan = {
    name: "Tony",
    team: "Ironman"
}

const importantFun = cap.petersTeam.bind(ironMan);
importantFun("Utk", "Pragyan", "Nishant", "Priya");