import mongoose from 'mongoose';

class DeliveryModel {
  private readonly deliverySchema: mongoose.Schema;

  constructor() {
    this.deliverySchema = new mongoose.Schema({
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
    return mongoose.model("Delivery", this.deliverySchema);
  }
}

export default new DeliveryModel().model;
