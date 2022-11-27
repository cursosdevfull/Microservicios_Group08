import { InternalServerErrorException } from '../../core/exceptions/internalserver.exception';
import { Store } from '../domain/entities/store';
import { BrokerRepository } from '../domain/repositories/broker.repository';
import { StoreRepository } from '../domain/repositories/store.repository';

export class StoreApplication {
  private repositoryStore: StoreRepository;
  private repositoryBroker: BrokerRepository;

  constructor(
    repositoryStore: StoreRepository,
    repositoryBroker: BrokerRepository
  ) {
    this.repositoryStore = repositoryStore;
    this.repositoryBroker = repositoryBroker;
  }

  async save(store: Store): Promise<Store> {
    const storeResult = await this.repositoryStore.save(store);
    if (storeResult.isErr()) {
      throw new InternalServerErrorException(storeResult.error.message);
    }

    await this.repositoryBroker.sent(storeResult.value);

    return storeResult.value;
  }

  async receive() {
    await this.repositoryBroker.receive();
  }
}
