import { IError } from './error.exception';

export class InternalServerErrorException extends IError {
  constructor(message: string) {
    super(message);
    this.status = 500;
  }
}
