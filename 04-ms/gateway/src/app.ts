import axios, { AxiosRequestConfig } from 'axios';
import express, { NextFunction, Request, Response } from 'express';

import AppService from './services/app.service';

type middleware = (req: Request, res: Response, next: NextFunction) => void;

interface Route {
  origin: string;
  target: string;
  method: "POST";
  middlewares: middleware[];
}

type Routes = Route[];

class App {
  readonly expressApp: any;

  private readonly routes: Routes = [
    {
      origin: "/api/order",
      target: `${AppService.PATH_ORDER}/order`,
      method: "POST",
      middlewares: [],
    },
  ];

  constructor() {
    this.expressApp = express();
    this.mountMiddlewares();
    this.mountRoutes();
  }

  mountMiddlewares(): void {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true }));
  }

  mountRoutes(): void {
    this.routes.forEach((route) => {
      const { origin, target, middlewares } = route;
      const method = route.method.toLowerCase();
      this.expressApp[method](origin, ...middlewares, this.execute(route));
    });
  }

  execute(route: Route) {
    return async (req: Request, res: Response) => {
      const request: AxiosRequestConfig<any> = {
        method: route.method,
        url: route.target,
        responseType: "json",
        data: { ...req.body },
      };

      try {
        const result = await axios(request);
        res.json(result.data);
      } catch (error) {
        res.json({ error });
      }
    };
  }
}