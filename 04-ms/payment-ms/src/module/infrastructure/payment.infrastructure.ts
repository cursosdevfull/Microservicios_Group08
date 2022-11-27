import { err, ok, Result } from 'neverthrow';

import { IError } from '../../core/exceptions/error.exception';
import { Payment } from '../domain/entities/payment';
import { PaymentRepository } from '../domain/repositories/payment.repository';
import Model from './models/payment.model';

export type PaymentResult = Result<Payment, IError>;
export class PaymentInfrastructure implements PaymentRepository {
  async save(payment: Payment): Promise<PaymentResult> {
    try {
      await Model.create(payment);
      return ok(payment);
    } catch (error) {
      const resultErr = new IError(error.message);
      resultErr.status = 500;
      return err(resultErr);
    }
  }
}
