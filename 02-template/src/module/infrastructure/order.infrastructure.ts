import { err, ok, Result } from 'neverthrow';

import { IError } from '../../core/exceptions/error.exception';
import { Order } from '../domain/entities/order';
import { OrderRepository } from '../domain/repositories/order.repository';
import Model from './models/order.model';

export type OrderResult = Result<Order, IError>;
export class OrderInfrastructure implements OrderRepository {
  async save(order: Order): Promise<OrderResult> {
    try {
      await Model.create(order);
      return ok(order);
    } catch (error) {
      const resultErr = new IError(error.message);
      resultErr.status = 500;
      return err(resultErr);
    }
  }
}
