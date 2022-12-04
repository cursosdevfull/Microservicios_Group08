import amqp from 'amqplib';

export default class UtilsBrokerService {
  static confirmMessage(channel: amqp.Channel, message: any) {
    channel.ack(message);
  }
}
