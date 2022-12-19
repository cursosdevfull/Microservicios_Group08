import { Request, Response } from 'express';

import { AuthApplication } from '../../application/auth.application';
import { AuthFactory } from '../../domain/entities/auth.factory';
import { Tokens } from '../../domain/repositories/auth.repository';

export default class {
  constructor(private readonly app: AuthApplication) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.validateAccessToken = this.validateAccessToken.bind(this);
    this.getNewAccesToken = this.getNewAccesToken.bind(this);
  }

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    console.log("register", req.body);

    const auth = await AuthFactory.create(name, email, password);
    const authSaved = await this.app.register(auth);
    res.json(authSaved);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log("login", req.body);

    const tokens: Tokens | null = await this.app.login(email, password);
    res.json(tokens);
  }

  async validateAccessToken(req: Request, res: Response) {
    const { token } = req.body;

    try {
      const payload = await this.app.validateAccessToken(token);
      res.json(payload);
    } catch (error) {
      res.status(error.status).json(error.message);
    }

    /*  this.app
      .validateAccessToken(token)
      .then((payload) => res.json(payload))
      .catch((error) => res.status(error.status).json(error.message)); */
  }

  async getNewAccesToken(req: Request, res: Response) {
    const { refreshToken } = req.body;

    const tokens: Tokens | null = await this.app.getNewAccesToken(refreshToken);

    if (tokens) {
      res.json(tokens);
    } else {
      res.status(401).json("Unauthorized");
    }
  }
}
