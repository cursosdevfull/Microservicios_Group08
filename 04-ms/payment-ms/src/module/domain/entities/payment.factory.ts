import { v4 as uuidv4 } from 'uuid';

import { Payment } from './payment';

export class PaymentFactory {
  static create(productId: string, price: number, quantity: number): Payment {
    if (price <= 0) {
      throw new Error("Price has to great than zero");
    }

    if (quantity <= 0) {
      throw new Error("Quantity has to great than zero");
    }

    const transactionId = uuidv4();
    return new Payment(transactionId, productId, price, quantity);
  }
}
