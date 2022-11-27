import { DeliveryApplication } from '../../application/delivery.application';

export default class {
  constructor(private readonly deliveryApplication: DeliveryApplication) {}

  async listen() {
    await this.deliveryApplication.receive();
    console.log("Broker listening");
  }
}
