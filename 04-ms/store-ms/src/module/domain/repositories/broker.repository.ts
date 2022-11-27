export interface BrokerRepository {
  sent(message: unknown): Promise<unknown>;
  receive(): Promise<any>;
}
