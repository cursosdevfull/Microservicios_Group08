import { PaymentResult } from '../../infrastructure/payment.infrastructure';
import { Payment } from '../entities/payment';

export interface PaymentRepository {
  save(payment: Payment): Promise<PaymentResult>;
}
