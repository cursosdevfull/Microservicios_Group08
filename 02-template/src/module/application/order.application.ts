import { Order } from '../domain/entities/order';
import { OrderRepository } from '../domain/repositories/order.repository';

export class OrderApplication {
  repository: OrderRepository;

  constructor(repository: OrderRepository) {
    this.repository = repository;
  }

  save(order: Order): Order {
    return this.repository.save(order);
  }
}
