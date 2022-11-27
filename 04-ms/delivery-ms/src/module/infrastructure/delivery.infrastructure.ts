import { err, ok, Result } from 'neverthrow';

import { IError } from '../../core/exceptions/error.exception';
import { Delivery } from '../domain/entities/delivery';
import { DeliveryRepository } from '../domain/repositories/delivery.repository';
import Model from './models/delivery.model';

export type DeliveryResult = Result<Delivery, IError>;
export class DeliveryInfrastructure implements DeliveryRepository {
  async save(delivery: Delivery): Promise<DeliveryResult> {
    try {
      await Model.create(delivery);
      return ok(delivery);
    } catch (error) {
      const resultErr = new IError(error.message);
      resultErr.status = 500;
      return err(resultErr);
    }
  }
}
