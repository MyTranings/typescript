export class Product {
  title: string;
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  getInfromation() {
    return [this.title, `$${this.price}`];
  }
}
