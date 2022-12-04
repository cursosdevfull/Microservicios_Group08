import { InternalServerErrorException } from '../../core/exceptions/internalserver.exception';
import { Auth } from '../domain/entities/auth';
import { AuthRepository, Tokens } from '../domain/repositories/auth.repository';
import AuthAppService from './auth.service';

export class AuthApplication {
  private repositoryAuth: AuthRepository;

  constructor(repositoryAuth: AuthRepository) {
    this.repositoryAuth = repositoryAuth;
  }

  async register(auth: Auth): Promise<Auth> {
    const authResult = await this.repositoryAuth.register(auth);
    if (authResult.isErr()) {
      throw new InternalServerErrorException(authResult.error.message);
    }

    return authResult.value;
  }

  async login(email: string, password: string): Promise<Tokens | null> {
    const auth = await this.repositoryAuth.findOne({ email });
    if (auth) {
      const isMatchPassword = await AuthAppService.isMatchPassword(
        password,
        auth.password
      );

      if (isMatchPassword) {
        const tokens: Tokens = {
          accessToken: AuthAppService.generateAccessToken(auth.id, auth.name),
          refreshToken: auth.refreshToken,
        };
        return tokens;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async validateAccessToken(token: string) {
    return AuthAppService.validateAccessToken(token);
  }

  async getNewAccesToken(refreshToken: string) {
    const auth = await this.repositoryAuth.findOne({ refreshToken });
    if (auth) {
      const newAccessToken = AuthAppService.generateAccessToken(
        auth.id,
        auth.name
      );

      const newRefreshToken = AuthAppService.generateRefreshToken();

      await this.repositoryAuth.update(
        { refreshToken },
        { refreshToken: newRefreshToken }
      );

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } else {
      return null;
    }
  }
}
