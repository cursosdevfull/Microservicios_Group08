import BrokerBootstrap from '../../bootstrap/broker.boostrap';
import { BrokerRepository } from '../domain/repositories/broker.repository';
import Model from './models/delivery.model';
import ReceiveMessageService from './services/receive-message.service';

export class BrokerInfrastructure implements BrokerRepository {
  async sent(message: unknown): Promise<any> {
    const channel = BrokerBootstrap.channel;
    const exchangeName = process.env.EXCHANGE_NAME || "exchange-order";
    const exchangeType = process.env.EXCHANGE_TYPE || "fanout";
    const routingKey = process.env.ROUTING_KEY || "";

    await channel.assertExchange(exchangeName, exchangeType, { durable: true });
    channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(message))
    );
  }
  async receive(): Promise<any> {
    const channel = BrokerBootstrap.channel;
    const queueName =
      process.env.QUEUE_NAME_RECEIVE_ORDER || "queue-order-created";
    await ReceiveMessageService.accept(
      channel,
      queueName,
      this.consumerAccept.bind(this)
    );
  }

  async consumerAccept(message: any) {
    const content = JSON.parse(message.content.toString());
    await Model.create(content);
    this.sent(content);
  }

  async consumerDeliveryConfirmed(message: any) {
    const messageParse = JSON.parse(message.content.toString());
    console.log(messageParse);

    BrokerBootstrap.channel.ack(message);
  }
}
