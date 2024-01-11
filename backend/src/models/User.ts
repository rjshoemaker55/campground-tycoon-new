import mongoose, { Document, Schema } from "mongoose";

interface UserDocument extends Document {
  username: string;
  password: string;
  money: number;
}

const userSchema = new Schema({
  username: String,
  password: String
});

const UserModel = mongoose.model<UserDocument>("User", userSchema, "users");

export default UserModel;
