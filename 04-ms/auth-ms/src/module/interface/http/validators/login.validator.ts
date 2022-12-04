import { IsNotEmpty, IsString } from 'class-validator';

export class LoginValidator {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
