import { InternalServerErrorException } from '../../core/exceptions/internalserver.exception';
import { Delivery } from '../domain/entities/delivery';
import { BrokerRepository } from '../domain/repositories/broker.repository';
import { DeliveryRepository } from '../domain/repositories/delivery.repository';

export class DeliveryApplication {
  private repositoryDelivery: DeliveryRepository;
  private repositoryBroker: BrokerRepository;

  constructor(
    repositoryDelivery: DeliveryRepository,
    repositoryBroker: BrokerRepository
  ) {
    this.repositoryDelivery = repositoryDelivery;
    this.repositoryBroker = repositoryBroker;
  }

  async save(delivery: Delivery): Promise<Delivery> {
    const deliveryResult = await this.repositoryDelivery.save(delivery);
    if (deliveryResult.isErr()) {
      throw new InternalServerErrorException(deliveryResult.error.message);
    }

    await this.repositoryBroker.sent(deliveryResult.value);

    return deliveryResult.value;
  }

  async receive() {
    await this.repositoryBroker.receive();
  }
}
