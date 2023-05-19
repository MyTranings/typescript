"use strict";
// Type unknown
let userInput;
let userName;
userInput = 5;
userInput = 'Dan';
// userName = userInput; // Not working, error
if (typeof userInput === 'string') {
    userName = userInput;
}
// Type never
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
// generateError('An error occurred!', 500);
const result = generateError('An error occurred!', 500);
const button = document.querySelector('button');
// ! 
// if(button)
// ?.
button === null || button === void 0 ? void 0 : button.addEventListener('click', function (e) {
});
//# sourceMappingURL=app.js.map