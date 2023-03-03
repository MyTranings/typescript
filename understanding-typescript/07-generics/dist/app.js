"use strict";
const names = []; // === const names: Array<string> 
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done');
    }, 2000);
});
promise.then(data => {
    data.split(' ');
    // data.round(); // Error
});
// function merge(objA: object, objB: object){ // Can't access properties from the result
// return Object.assign({}, objA, objB);
// }
// const mergedObj = merge({name: 'Man'}, {age: '30' })
// mergedObj.name;
// function merge<T, U>(objA: T, objB: U): T & U {
function merge(objA, objB) {
    // return {...objA, ...objB};
    // return Object.assign(objA, objB) as T & U;
    // return Object.assign({}, objA, objB);
    return Object.assign(objA, objB);
}
// const mergedObj1 = merge({name: 'Max'}, {age: '30'}) as {name: string, age: number};
// const mergedObj1: {name: string, age:number } = merge<{name: string}, {age: number}>({name: 'Max'}, {age: 30});
const mergedObj1 = merge({ name: 'Max' }, { age: 30 });
function countAndDescription(element) {
    let description = 'Got no value';
    if (element.length === 1) {
        description = `Got ${element.length} element`;
    }
    else if (element.length > 1) {
        description = `Got ${element.length} elements`;
    }
    return [element, description];
}
// console.log(countAndDescription(['Sport', 'Cook']))
function extractAndConvert(obj, key) {
    return 'Value ' + obj[key];
}
// console.log(extractAndConvert({name: 'Dan'}, 'name'))
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('Dan');
textStorage.addItem('Manu');
textStorage.removeItem('Manu');
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
numberStorage.addItem(10);
numberStorage.addItem(20);
numberStorage.removeItem(20);
console.log(numberStorage.getItems());
function craeteCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const lockNames = ['Max', 'Anna'];
// lockNames.push('Dan');
// lockNames.pop();
//# sourceMappingURL=app.js.map