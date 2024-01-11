import mongoose, { Document, Schema } from "mongoose";

interface ProfileDocument extends Document {
  userId: string;
  money: number;
}

const ProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  money: {
    type: Number,
    default: 0
  }
});

const ProfileModel = mongoose.model<ProfileDocument>("Profile", ProfileSchema);

export default ProfileModel;
