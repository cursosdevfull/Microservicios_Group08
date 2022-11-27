import amqp from 'amqplib';

import { Bootstrap } from './bootstrap';

export default class BrokerBootstrap extends Bootstrap {
  static channel: amqp.Channel;

  initialize(): Promise<boolean | Error> {
    return new Promise(async (resolve, reject) => {
      const host = process.env.RABBITMQ_HOST || "localhost:5672";

      try {
        const connection = await amqp.connect(`amqp://${host}`);
        BrokerBootstrap.channel = await connection.createChannel();
        console.log("Connected to RabbitMQ");
        resolve(true);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}
