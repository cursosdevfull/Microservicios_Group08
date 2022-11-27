import { validate } from 'class-validator';
import express, { NextFunction, Request, Response } from 'express';

import { BadRequestErrorException } from '../../../core/exceptions/badrequest.exception';
import Controller from './delivery.controller';
import { InsertValidator } from './validators/insert.validator';

export default class {
  private readonly expressRouter: express.Router;

  constructor(private readonly controller: Controller) {
    this.expressRouter = express.Router();
    this.mountRoutes();
  }

  validator(instance: any) {
    return (req: Request, res: Response, next: NextFunction) => {
      const body = req.body;
      Object.assign(instance, body);
      validate(instance).then((errors) => {
        if (errors.length > 0) {
          throw new BadRequestErrorException(JSON.stringify(errors));
        } else {
          next();
        }
      });
    };
  }

  mountRoutes() {
    this.expressRouter.post(
      "/",
      this.validator(new InsertValidator()),
      this.controller.insertDelivery
    );
  }

  get router() {
    return this.expressRouter;
  }
}
