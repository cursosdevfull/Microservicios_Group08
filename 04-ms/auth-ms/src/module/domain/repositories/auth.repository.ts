import { AuthResult } from '../../infrastructure/auth.infrastructure';
import { Auth } from '../entities/auth';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthRepository {
  register(auth: Auth): Promise<AuthResult>;
  findOne(where: { [s: string]: string | number }): Promise<any>;
  update(
    where: { [s: string]: string | number },
    data: { [s: string]: string | number }
  ): Promise<any>;
}
