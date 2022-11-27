import { PaymentApplication } from '../../application/payment.application';

export default class {
  constructor(private readonly paymentApplication: PaymentApplication) {}

  async listen() {
    await this.paymentApplication.receive();
    console.log("Broker listening");
  }
}
