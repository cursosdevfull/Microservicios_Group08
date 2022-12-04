import { validate } from 'class-validator';
import express, { NextFunction, Request, Response } from 'express';

import { BadRequestErrorException } from '../../../core/exceptions/badrequest.exception';
import Controller from './auth.controller';
import { LoginValidator } from './validators/login.validator';
import { RefreshTokenValidator } from './validators/refresh-token.validator';
import { RegisterValidator } from './validators/register.validator';
import { TokenValidator } from './validators/token.validator';

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
      "/register",
      this.validator(new RegisterValidator()),
      this.controller.register
    );

    this.expressRouter.post(
      "/login",
      this.validator(new LoginValidator()),
      this.controller.login
    );

    this.expressRouter.post(
      "/validate-access-token",
      this.validator(new TokenValidator()),
      this.controller.validateAccessToken
    );

    this.expressRouter.post(
      "/get-new-access-token",
      this.validator(new RefreshTokenValidator()),
      this.controller.getNewAccesToken
    );
  }

  get router() {
    return this.expressRouter;
  }
}
