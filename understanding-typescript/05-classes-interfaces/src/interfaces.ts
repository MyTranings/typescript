// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
}

interface Named {
  readonly name?: string;
  outputName?: string;
}
interface Greetable extends Named {

  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;

  constructor(public age: number, n?: string) {
    if(n) {
      this.name = n;
    }
  }

  greet(phrase: string): void {
    if(this.name) {
      console.log(phrase + ' ' + this.name)
    } else {
      console.log(phrase);
    }
  }
}

let user1: Greetable;

user1 = new Person(30, 'Max');
user1.greet('Hello, I\m')


// user1.greet('Hi there, I\'m ');

let user2 = new Person(30);
console.log(user2)