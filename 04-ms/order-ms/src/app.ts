import express, { Application } from 'express';

import { OrderApplication } from './module/application/order.application';
import { BrokerInfrastructure } from './module/infrastructure/broker.infrastructure';
import { OrderInfrastructure } from './module/infrastructure/order.infrastructure';
import Controller from './module/interface/http/order.controller';
import OrderRouter from './module/interface/http/router';

class App {
  private readonly expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.mountMiddlewares();
    this.mountRoutes();
    this.mountErrors();
  }

  mountMiddlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true }));
  }

  mountRoutes() {
    const infrastructure = new OrderInfrastructure();
    const broker = new BrokerInfrastructure();
    const application = new OrderApplication(infrastructure, broker);
    const controller = new Controller(application);
    const router = new OrderRouter(controller);

    this.expressApp.use("/order", router.router);
    this.expressApp.get("/", (req, res) => res.send("All's ok"));
  }

  mountErrors() {}

  get app() {
    return this.expressApp;
  }
}

export default new App().app;
