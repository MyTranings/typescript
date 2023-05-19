const names: string[] = []; // === const names: Array<string> 

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is done');
  }, 2000)
});
promise.then(data => {
  data.split(' ');
  // data.round(); // Error
})


// function merge(objA: object, objB: object){ // Can't access properties from the result
  // return Object.assign({}, objA, objB);
// }

// const mergedObj = merge({name: 'Man'}, {age: '30' })
// mergedObj.name;


// function merge<T, U>(objA: T, objB: U): T & U {
  function merge<T extends object, U extends object>(objA: T, objB: U): T & U {
  // return {...objA, ...objB};
  // return Object.assign(objA, objB) as T & U;
  // return Object.assign({}, objA, objB);
  return Object.assign(objA, objB);
}

// const mergedObj1 = merge({name: 'Max'}, {age: '30'}) as {name: string, age: number};
// const mergedObj1: {name: string, age:number } = merge<{name: string}, {age: number}>({name: 'Max'}, {age: 30});
const mergedObj1 = merge({name: 'Max'}, {age: 30});
// console.log(mergedObj1.name);

interface Lengthy {
  length: number;
}


function countAndDescription<T extends Lengthy>(element: T): [T, string] {
  let description = 'Got no value';
  if(element.length === 1) {
    description = `Got ${element.length} element`;
  } else if(element.length > 1) {
    description = `Got ${element.length} elements`;
  }
  return [element, description]
}

// console.log(countAndDescription(['Sport', 'Cook']))


function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'Value ' + obj[key];
}

// console.log(extractAndConvert({name: 'Dan'}, 'name'))



class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if(this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Dan')
textStorage.addItem('Manu')
textStorage.removeItem('Manu')

console.log(textStorage.getItems())

const numberStorage = new DataStorage<number>();

numberStorage.addItem(10);
numberStorage.addItem(20)
numberStorage.removeItem(20)

console.log(numberStorage.getItems())

// const objectStorage = new DataStorage<object>();
// const danObj = { name: 'Dan' };

// objectStorage.addItem(danObj);
// objectStorage.addItem({name: 'Max', age: 30})
// objectStorage.removeItem(danObj)


// console.log(objectStorage.getItems())


interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function craeteCourseGoal(title: string, description: string, date: Date) {
  let courseGoal: Partial<CourseGoal> = {};

  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;

  return courseGoal as CourseGoal;
}

const lockNames: Readonly<string[]> = ['Max', 'Anna']
// lockNames.push('Dan');
// lockNames.pop();