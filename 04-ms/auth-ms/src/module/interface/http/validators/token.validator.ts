import { IsNotEmpty, IsString } from 'class-validator';

export class TokenValidator {
  @IsNotEmpty()
  @IsString()
  token: string;
}
