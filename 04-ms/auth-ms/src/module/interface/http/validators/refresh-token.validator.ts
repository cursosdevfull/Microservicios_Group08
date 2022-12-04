import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenValidator {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
