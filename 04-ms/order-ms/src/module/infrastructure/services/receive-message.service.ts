import amqp from 'amqplib';

export default class ReceiveMessageService {
  static async orderConfirmedOrRejected(
    channel: amqp.Channel,
    cb: (message: unknown) => void,
    exchangeName: string,
    exchangeType: string,
    routingKey: string | string[]
  ) {
    await channel.assertExchange(exchangeName, exchangeType, { durable: true });

    const assertQueue = await channel.assertQueue("", { exclusive: true });

    if (Array.isArray(routingKey)) {
      routingKey.forEach((key) => {
        channel.bindQueue(assertQueue.queue, exchangeName, key);
      });
    } else {
      channel.bindQueue(assertQueue.queue, exchangeName, routingKey);
    }

    channel.consume(assertQueue.queue, (message) => cb(message), {
      noAck: false,
    });
  }
}
