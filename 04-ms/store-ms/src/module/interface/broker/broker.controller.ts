import { StoreApplication } from '../../application/store.application';

export default class {
  constructor(private readonly storeApplication: StoreApplication) {}

  async listen() {
    await this.storeApplication.receive();
    console.log("Broker listening");
  }
}
