import { v4 as uuidv4 } from 'uuid';

import { Store } from './store';

export class StoreFactory {
  static create(productId: string, price: number, quantity: number): Store {
    if (price <= 0) {
      throw new Error("Price has to great than zero");
    }

    if (quantity <= 0) {
      throw new Error("Quantity has to great than zero");
    }

    const transactionId = uuidv4();
    return new Store(transactionId, productId, price, quantity);
  }
}
