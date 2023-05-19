function add1(n1: number,  n2: number, showResult: boolean, phrase: string) {
  // if(typeof n1 !== 'number' && typeof n2 !== 'number') {
  //   throw new Error('Incorrect input');
  // }
  const result = n1 + n2;
  if(showResult) {
    console.log(phrase + result);
  } else {
    return result;
  }
}
let number1: number;
number1 = 5;
const number2 = 2.8;
const showResult = true;
let resultPhrase = 'Result is: ';

add1(number1, number2, showResult, resultPhrase)

// const person: {
  // name: string;
  // age: number;
  // hobbies: string[]
// } = {

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role { ADMIN, READ_ONLY, AUTHOR }



const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: Role; // Tuple fixed length and type
} = {
  name: 'Daniel',
  age: 30,
  hobbies: [ 'Sports', 'Gaming' ],
  role: Role.ADMIN
}

let favoriesActivities: string[];
favoriesActivities = ['Sports'];

let favoriesActivities2: any[];
favoriesActivities2 = ['Sports'];

// person.role.push('admin');
// person.role[1] = 10;

// person.role = [2, 'author', 'dasda'] 

console.log(person.name)

console.log(Role)