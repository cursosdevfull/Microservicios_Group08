export interface BrokerRepository {
  sent(message: unknown): Promise<unknown>;
  receive(): Promise<unknown>;
}
