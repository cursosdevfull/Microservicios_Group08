import { OrderResult } from '../../infrastructure/order.infrastructure';
import { Order } from '../entities/order';

export interface OrderRepository {
  save(order: Order): Promise<OrderResult>;
}
