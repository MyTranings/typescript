type Combinable = number | string;

// function combine(input1: number | string, input2: number | string, resultConversion: 'as-number' | 'as-string') {
function combine(input1: Combinable, input2: Combinable, resultConversion: 'as-number' | 'as-string') {
  let result;
  if(typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  if(resultConversion === 'as-number') {
    return +result;
  } else {
    return result.toString();
  }
}

const comibedAges = combine(30, 26, 'as-number');
console.log(comibedAges);

const comibedStringAges = combine('30', '26', 'as-number');
console.log(comibedAges);

const comibedNames = combine('Max', 'Anna', 'as-string');
console.log(comibedNames);