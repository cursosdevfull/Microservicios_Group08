import BrokerBootstrap from '../../bootstrap/broker.boostrap';
import { BrokerRepository } from '../domain/repositories/broker.repository';
import ReceiveMessageService from './services/receive-message.service';

export class BrokerInfrastructure implements BrokerRepository {
  async sent(message: unknown): Promise<unknown> {
    const channel = BrokerBootstrap.channel;
    const queueName = "order";
    await channel.assertQueue(queueName, { durable: true });
    return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }
  async receive(): Promise<unknown> {
    const channel = BrokerBootstrap.channel;
    const exchangeName = "exchange-order";
    const exchangeType = "fanout";
    const routingKey = "*.order";

    return await ReceiveMessageService.orderConfirmed(
      channel,
      this.consumerOrderConfirmed.bind(this),
      exchangeName,
      exchangeType,
      routingKey
    );
  }

  async consumerOrderConfirmed(message: any) {
    const messageParse = JSON.parse(message.content.toString());
    console.log(messageParse);

    BrokerBootstrap.channel.ack(message);
  }
}
