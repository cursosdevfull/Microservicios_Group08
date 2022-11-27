import { Request, Response } from 'express';

import { StoreApplication } from '../../application/store.application';
import { StoreFactory } from '../../domain/entities/store.factory';

export default class {
  constructor(private readonly app: StoreApplication) {
    this.insertStore = this.insertStore.bind(this);
  }

  async insertStore(req: Request, res: Response) {
    const { productId, price, quantity } = req.body;

    const store = StoreFactory.create(productId, price, quantity);
    const storeSaved = await this.app.save(store);
    res.json(storeSaved);
  }
}
