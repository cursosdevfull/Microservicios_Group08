import http from 'http';

import app from '../app';
import { Bootstrap } from './bootstrap';

export default class ServerBootstrap extends Bootstrap {
  initialize(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const port = process.env.PORT || 4000;
      const server = http.createServer(app);
      server
        .listen(port)
        .on("listening", () => {
          resolve(true);
          console.log(`Server started in port ${port}`);
        })
        .on("error", (err) => {
          reject(err);
          console.log("Server failed to start");
        });
    });
  }
}
