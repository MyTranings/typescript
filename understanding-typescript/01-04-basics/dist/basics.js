"use strict";
function add1(n1, n2, showResult, phrase) {
    // if(typeof n1 !== 'number' && typeof n2 !== 'number') {
    //   throw new Error('Incorrect input');
    // }
    const result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return result;
    }
}
let number1;
number1 = 5;
const number2 = 2.8;
const showResult = true;
let resultPhrase = 'Result is: ';
add1(number1, number2, showResult, resultPhrase);
// const person: {
// name: string;
// age: number;
// hobbies: string[]
// } = {
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
const person = {
    name: 'Daniel',
    age: 30,
    hobbies: ['Sports', 'Gaming'],
    role: Role.ADMIN
};
let favoriesActivities;
favoriesActivities = ['Sports'];
let favoriesActivities2;
favoriesActivities2 = ['Sports'];
// person.role.push('admin');
// person.role[1] = 10;
// person.role = [2, 'author', 'dasda'] 
console.log(person.name);
console.log(Role);
//# sourceMappingURL=basics.js.map