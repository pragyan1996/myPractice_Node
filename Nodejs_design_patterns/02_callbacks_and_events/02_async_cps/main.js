function addAsync(a, b, cb) {
    setTimeout(() => cb(a + b), 100);  
}

console.log('before');
addAsync(3, 4, (result)=> console.log(result));
console.log('after');