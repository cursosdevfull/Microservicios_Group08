import 'es6-shim';
import 'reflect-metadata';

import BrokerBootstrap from './bootstrap/broker.boostrap';
import DatabaseBootstrap from './bootstrap/database.bootstrap';
import ServerBootstrap from './bootstrap/server.bootstrap';

const server = new ServerBootstrap();
const database = new DatabaseBootstrap();
const broker = new BrokerBootstrap();

(async () => {
  try {
    await server.initialize();
    await database.initialize();
    await broker.initialize();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
