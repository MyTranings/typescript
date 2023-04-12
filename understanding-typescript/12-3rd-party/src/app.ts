import "reflect-metadata";
import { plainToClass } from "class-transformer";

import { Product } from "./product.model";

// const p1 = new Product("A book", 12.99);

// console.log(p1.getInfromation());

const products = [
  { title: "A Carpet", price: 29.99 },
  { title: "A Book", price: 10.99 },
];

// const loadedProducts = products.map((prod) => {
//   return new Product(prod.title, prod.price);
// });

const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInfromation());
}
