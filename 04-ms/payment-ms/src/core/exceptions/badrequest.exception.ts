import { IError } from './error.exception';

export class BadRequestErrorException extends IError {
  constructor(message: string) {
    super(message);
    this.status = 411;
  }
}
