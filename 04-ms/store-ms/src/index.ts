import 'es6-shim';
import 'reflect-metadata';

import BrokerBootstrap from './bootstrap/broker.boostrap';
import DatabaseBootstrap from './bootstrap/database.bootstrap';
import ServerBootstrap from './bootstrap/server.bootstrap';
import { StoreApplication } from './module/application/store.application';
import { BrokerInfrastructure } from './module/infrastructure/broker.infrastructure';
import { StoreInfrastructure } from './module/infrastructure/store.infrastructure';
import BrokerController from './module/interface/broker/broker.controller';

const server = new ServerBootstrap();
const database = new DatabaseBootstrap();
const broker = new BrokerBootstrap();

const storeInfrastructure = new StoreInfrastructure();
const brokerInfrastructure = new BrokerInfrastructure();
const storeApplication = new StoreApplication(
  storeInfrastructure,
  brokerInfrastructure
);

const brokerController = new BrokerController(storeApplication);

(async () => {
  try {
    const listPromises = [
      server.initialize(),
      database.initialize(),
      broker.initialize(),
    ];
    await Promise.all(listPromises);

    await brokerController.listen();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
