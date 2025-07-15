import { increment, count } from "./counter.js";
increment();
console.log(count);
increment();
console.log(count);
count++; //THis will throw error:  Assignment to constant variable. THis is because the binding to the original is read only when imported.
console.log(count);