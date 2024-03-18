export default class Order {
  id: string;
  carName: string;
  quantity: number;
  constructor(id: string, carName: string, quantity: number) {
    this.id = id;
    this.carName = carName;
    this.quantity = quantity;
  }
}
