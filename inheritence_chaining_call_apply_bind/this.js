/**
 * this behaviour: 
 * global scope GEC: window object (this value)
 * function call: window object (this value)
 * method call: current object
 * constructor function:  objects get created with new keyword so this refers to the newly created object
 * Event handler: this refers to the DOM element in which the event occoured
 * Arrow function: this cannot be bind with the arrow function, this can be bind with the outer space of the function.
 */

const robot = {
    energyLevel: 100,
    checkEnergy: () => {
        console.log(`1 Energy is currently at: ${this.energyLevel}`);
    },
    showEnergyLevel: function () {
        const checkEnergy = () => {
            console.log(`2 Energy is at ${this.energyLevel}`);
        }
        checkEnergy()
    }
}

robot.checkEnergy()
robot.showEnergyLevel()