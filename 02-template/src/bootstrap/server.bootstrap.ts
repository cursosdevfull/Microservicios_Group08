import http from 'http';

import app from '../app';
import { Bootstrap } from './bootstrap';

export default class ServerBootstrap extends Bootstrap {
  initialize(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(app);
      server
        .listen(4000)
        .on("listening", () => {
          resolve(true);
          console.log("Server started in port 4000");
        })
        .on("error", (err) => {
          reject(err);
          console.log("Server failed to start");
        });
    });
  }
}
