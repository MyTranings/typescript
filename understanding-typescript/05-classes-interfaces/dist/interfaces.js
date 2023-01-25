"use strict";
let add;
add = (n1, n2) => {
    return n1 + n2;
};
class Person {
    constructor(age, n) {
        this.age = age;
        if (n) {
            this.name = n;
        }
    }
    greet(phrase) {
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        }
        else {
            console.log(phrase);
        }
    }
}
let user1;
user1 = new Person(30, 'Max');
user1.greet('Hello, I\m');
// user1.greet('Hi there, I\'m ');
let user2 = new Person(30);
console.log(user2);
//# sourceMappingURL=interfaces.js.map