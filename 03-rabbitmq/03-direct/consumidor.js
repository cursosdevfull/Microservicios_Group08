const amqp = require("amqplib");
const args = process.argv.slice(2);

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchangeName = "exchange-direct";
  await channel.assertExchange(exchangeName, "direct", { durable: true });

  const assertQueue = await channel.assertQueue("", { exclusive: true });
  const routingKey = args.length > 1 ? args[1] : "key-direct";
  await channel.bindQueue(assertQueue.queue, exchangeName, routingKey);

  const noAck = args.length > 0 ? true : false;

  channel.consume(
    assertQueue.queue,
    (message) => console.log(message.content.toString()),
    { noAck }
  );
})();
