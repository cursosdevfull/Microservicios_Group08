import 'es6-shim';
import 'reflect-metadata';

import BrokerBootstrap from './bootstrap/broker.boostrap';
import DatabaseBootstrap from './bootstrap/database.bootstrap';
import ServerBootstrap from './bootstrap/server.bootstrap';
import { OrderApplication } from './module/application/order.application';
import { BrokerInfrastructure } from './module/infrastructure/broker.infrastructure';
import { OrderInfrastructure } from './module/infrastructure/order.infrastructure';
import BrokerController from './module/interface/broker/broker.controller';

const server = new ServerBootstrap();
const database = new DatabaseBootstrap();
const broker = new BrokerBootstrap();

const orderInfrastructure = new OrderInfrastructure();
const brokerInfrastructure = new BrokerInfrastructure();
const orderApplication = new OrderApplication(
  orderInfrastructure,
  brokerInfrastructure
);

const brokerController = new BrokerController(orderApplication);

(async () => {
  try {
    const listPromises = [
      server.initialize(),
      database.initialize(),
      broker.initialize(),
    ];
    await Promise.all(listPromises);

    /*     await server.initialize();
    await database.initialize();
    await broker.initialize(); */
    await brokerController.listen();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
