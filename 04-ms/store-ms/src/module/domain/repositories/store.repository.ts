import { StoreResult } from '../../infrastructure/store.infrastructure';
import { Store } from '../entities/store';

export interface StoreRepository {
  save(store: Store): Promise<StoreResult>;
}
