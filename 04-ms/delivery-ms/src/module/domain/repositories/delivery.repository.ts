import { DeliveryResult } from '../../infrastructure/delivery.infrastructure';
import { Delivery } from '../entities/delivery';

export interface DeliveryRepository {
  save(delivery: Delivery): Promise<DeliveryResult>;
}
