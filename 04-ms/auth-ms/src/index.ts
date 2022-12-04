import 'es6-shim';
import 'reflect-metadata';

import DatabaseBootstrap from './bootstrap/database.bootstrap';
import ServerBootstrap from './bootstrap/server.bootstrap';

const server = new ServerBootstrap();
const database = new DatabaseBootstrap();

(async () => {
  try {
    const listPromises = [server.initialize(), database.initialize()];
    await Promise.all(listPromises);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
