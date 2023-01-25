// function merge(objA: object, objB: object) {
//   return Object.assign(objA, objB);
// }

// const mergedObj = merge({name: 'Man'}, {age: '30' })

function merge<T, U>(objA: T, objB: U): T & U {
  return Object.assign(objA, objB);
}

const mergedObj = merge({name: 'Max'}, {age: '30'})