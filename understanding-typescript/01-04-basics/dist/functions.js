"use strict";
function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log('Result: ' + num);
}
function addAndHandle(n1, n2, cb) {
    const reuslt = n1 + n2;
    cb(reuslt);
}
printResult(add(5, 12));
// let combineValues;
// let combineValues: Function;
let combineValues;
combineValues = add;
// combineValues = printResult;
// combineValues = 5;
console.log(combineValues(8, 8));
addAndHandle(10, 20, (reuslt) => {
    console.log(reuslt);
});
//# sourceMappingURL=functions.js.map