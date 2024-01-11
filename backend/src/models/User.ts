import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  password: string;
  money: number;
  lastUpdate: Date;
}

const userSchema = new Schema({
  username: String,
  password: String,
  money: {
    type: Number,
    default: 0
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});

const UserModel = mongoose.model<UserDocument>("User", userSchema, "users");

export { UserModel };
