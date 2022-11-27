import mongoose from 'mongoose';

class StoreModel {
  private readonly storeSchema: mongoose.Schema;

  constructor() {
    this.storeSchema = new mongoose.Schema({
      transactionId: {
        type: String,
        required: true,
      },
      productId: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      createdAt: {
        type: Date,
        required: true,
      },
      updatedAt: {
        type: Date,
        required: false,
      },
      deletedAt: {
        type: Date,
        required: false,
      },
      status: {
        type: String,
        required: true,
      },
      active: {
        type: Boolean,
        required: true,
      },
    });
  }

  get model() {
    return mongoose.model("Store", this.storeSchema);
  }
}

export default new StoreModel().model;
