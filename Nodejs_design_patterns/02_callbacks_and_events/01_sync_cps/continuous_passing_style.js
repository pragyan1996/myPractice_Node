//CPS
function addCPS(a, b, cb) {
    cb(a + b);
}

addCPS(3, 4, (result) => console.log(result));