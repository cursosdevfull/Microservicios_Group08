import { Order } from '../domain/entities/order';
import { OrderRepository } from '../domain/repositories/order.repository';
import Model from './models/order.model';

export class OrderInfrastructure implements OrderRepository {
  async save(order: Order): Promise<Order> {
    await Model.create(order);
    return order;
  }
}
