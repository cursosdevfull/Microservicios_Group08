import { InternalServerErrorException } from '../../core/exceptions/internalserver.exception';
import { Order } from '../domain/entities/order';
import { BrokerRepository } from '../domain/repositories/broker.repository';
import { OrderRepository } from '../domain/repositories/order.repository';

export class OrderApplication {
  private repositoryOrder: OrderRepository;
  private repositoryBroker: BrokerRepository;

  constructor(
    repositoryOrder: OrderRepository,
    repositoryBroker: BrokerRepository
  ) {
    this.repositoryOrder = repositoryOrder;
    this.repositoryBroker = repositoryBroker;
  }

  async save(order: Order): Promise<Order> {
    const orderResult = await this.repositoryOrder.save(order);
    if (orderResult.isErr()) {
      throw new InternalServerErrorException(orderResult.error.message);
    }

    await this.repositoryBroker.sent(orderResult.value);

    return orderResult.value;
  }
}
