import BrokerBootstrap from '../../bootstrap/broker.boostrap';
import { BrokerRepository } from '../domain/repositories/broker.repository';
import Model from './models/store.model';
import ReceiveMessageService from './services/receive-message.service';
import UtilsBrokerService from './services/utils-broker.service';

export class BrokerInfrastructure implements BrokerRepository {
  async sent(message: unknown): Promise<unknown> {
    const channel = BrokerBootstrap.channel;
    const queueName = process.env.QUEUE_NAME || "store";
    await channel.assertQueue(queueName, { durable: true });
    return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }

  async sentError(message: unknown): Promise<any> {
    const channel = BrokerBootstrap.channel;
    const exchangeName = process.env.EXCHANGE_NAME_REJECT || "exchange-reject";
    const exchangeType = process.env.EXCHANGE_TYPE_REJECT || "topic";
    const routingKey = process.env.ROUTING_KEY_REJECT || "store.error";

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

    const exchangeNameReject =
      process.env.EXCHANGE_NAME_REJECT || "exchange-reject";
    const exchangeTypeReject = process.env.EXCHANGE_TYPE_REJECT || "topic";
    const routingKeyReject = process.env.ROUTING_KEY_REJECT || "delivery.error";

    await ReceiveMessageService.orderConfirmedOrRejected(
      channel,
      this.consumerReject.bind(this),
      exchangeNameReject,
      exchangeTypeReject,
      routingKeyReject
    );

    const exchangeName = process.env.EXCHANGE_NAME || "exchange-order";
    const exchangeType = process.env.EXCHANGE_TYPE || "fanout";
    const routingKey = process.env.ROUTING_KEY || "";

    return await ReceiveMessageService.orderConfirmedOrRejected(
      channel,
      this.consumerOrderConfirmed.bind(this),
      exchangeName,
      exchangeType,
      routingKey
    );
  }

  async consumerAccept(message: any) {
    const content = JSON.parse(message.content.toString());
    await Model.create(content);
    UtilsBrokerService.confirmMessage(BrokerBootstrap.channel, message);
    this.sent(content);
  }

  async consumerReject(message: any) {
    const content = JSON.parse(message.content.toString());
    await Model.updateOne(
      { transactionId: content.transactionId },
      { status: "CANCELLED" }
    );
    UtilsBrokerService.confirmMessage(BrokerBootstrap.channel, message);
  }

  async consumerOrderConfirmed(message: any) {
    const messageParse = JSON.parse(message.content.toString());
    const { transactionId } = messageParse;

    const order = await Model.findOne({ transactionId });

    if (order) {
      await Model.updateOne({ transactionId }, { status: "APPROVED" });
    }

    console.log("Order confirmed: ", transactionId);

    BrokerBootstrap.channel.ack(message);
  }
}
