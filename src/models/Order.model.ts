export default class Order {
  id: number;
  carName: string;
  quantity: number;
  constructor(id: number, carName: string, quantity: number) {
    this.id = id;
    this.carName = carName;
    this.quantity = quantity;
  }
}
