import { err, ok, Result } from 'neverthrow';

import { IError } from '../../core/exceptions/error.exception';
import { Store } from '../domain/entities/store';
import { StoreRepository } from '../domain/repositories/store.repository';
import Model from './models/store.model';

export type StoreResult = Result<Store, IError>;
export class StoreInfrastructure implements StoreRepository {
  async save(store: Store): Promise<StoreResult> {
    try {
      await Model.create(store);
      return ok(store);
    } catch (error) {
      const resultErr = new IError(error.message);
      resultErr.status = 500;
      return err(resultErr);
    }
  }
}
