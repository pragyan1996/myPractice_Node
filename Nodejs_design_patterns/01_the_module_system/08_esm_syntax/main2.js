import { log } from "./logger.js";

// const log = 'Message';
console.log(log);

//This will give error: log has already declared so we can resolve this by: renaming the imported entry with the as keyword.
import { Logger as logg } from "./logger.js";
console.log(logg);
