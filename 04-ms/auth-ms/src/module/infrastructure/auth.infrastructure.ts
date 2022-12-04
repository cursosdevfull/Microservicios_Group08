import { err, ok, Result } from 'neverthrow';

import { IError } from '../../core/exceptions/error.exception';
import { Auth } from '../domain/entities/auth';
import { AuthRepository } from '../domain/repositories/auth.repository';
import Model from './models/auth.model';

export type AuthResult = Result<Auth, IError>;
export class AuthInfrastructure implements AuthRepository {
  async findOne(where: { [s: string]: string | number }): Promise<any> {
    return await Model.findOne(where);
  }
  async register(auth: Auth): Promise<AuthResult> {
    try {
      await Model.create(auth);
      return ok(auth);
    } catch (error) {
      const resultErr = new IError(error.message);
      resultErr.status = 500;
      return err(resultErr);
    }
  }

  async update(
    where: { [s: string]: string | number },
    data: { [s: string]: string | number }
  ): Promise<any> {
    return await Model.updateOne(where, data);
  }
}
