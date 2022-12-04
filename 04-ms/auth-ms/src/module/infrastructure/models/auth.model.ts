import mongoose from 'mongoose';

class AuthModel {
  private readonly authSchema: mongoose.Schema;

  constructor() {
    this.authSchema = new mongoose.Schema({
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      refreshToken: {
        type: String,
        required: true,
      },
    });
  }

  get model() {
    return mongoose.model("Auth", this.authSchema);
  }
}

export default new AuthModel().model;
