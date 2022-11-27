import { Request, Response } from 'express';

import { DeliveryApplication } from '../../application/delivery.application';
import { DeliveryFactory } from '../../domain/entities/delivery.factory';

export default class {
  constructor(private readonly app: DeliveryApplication) {
    this.insertDelivery = this.insertDelivery.bind(this);
  }

  async insertDelivery(req: Request, res: Response) {
    const { productId, price, quantity } = req.body;

    const delivery = DeliveryFactory.create(productId, price, quantity);
    const deliverySaved = await this.app.save(delivery);
    res.json(deliverySaved);
  }
}
