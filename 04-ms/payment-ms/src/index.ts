import 'es6-shim';
import 'reflect-metadata';

import BrokerBootstrap from './bootstrap/broker.boostrap';
import DatabaseBootstrap from './bootstrap/database.bootstrap';
import ServerBootstrap from './bootstrap/server.bootstrap';
import { PaymentApplication } from './module/application/payment.application';
import { BrokerInfrastructure } from './module/infrastructure/broker.infrastructure';
import { PaymentInfrastructure } from './module/infrastructure/payment.infrastructure';
import BrokerController from './module/interface/broker/broker.controller';

const server = new ServerBootstrap();
const database = new DatabaseBootstrap();
const broker = new BrokerBootstrap();

const paymentInfrastructure = new PaymentInfrastructure();
const brokerInfrastructure = new BrokerInfrastructure();
const paymentApplication = new PaymentApplication(
  paymentInfrastructure,
  brokerInfrastructure
);

const brokerController = new BrokerController(paymentApplication);

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
