// Type unknown

let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Dan';

// userName = userInput; // Not working, error
if(typeof userInput === 'string') {
  userName = userInput
}

// Type never

function generateError(message: string, code: number): never {
  throw {message: message, errorCode: code};
}

// generateError('An error occurred!', 500);
const result = generateError('An error occurred!', 500);

const button = document.querySelector('button');

// ! 
// if(button)
// ?.

button?.addEventListener('click', function(e) {

})