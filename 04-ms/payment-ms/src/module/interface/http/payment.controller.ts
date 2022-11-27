import { Request, Response } from 'express';

import { PaymentApplication } from '../../application/payment.application';
import { PaymentFactory } from '../../domain/entities/payment.factory';

export default class {
  constructor(private readonly app: PaymentApplication) {
    this.insertPayment = this.insertPayment.bind(this);
  }

  async insertPayment(req: Request, res: Response) {
    const { productId, price, quantity } = req.body;

    const payment = PaymentFactory.create(productId, price, quantity);
    const paymentSaved = await this.app.save(payment);
    res.json(paymentSaved);
  }
}
