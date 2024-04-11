import mongoose, { Document } from 'mongoose';

interface IUserData extends Document {
  fid: number;
  hash: string;
}

const userDataSchema = new mongoose.Schema({
  fid: { type: Number, required: true },
  hash: { type: String, required: true }
});

export default mongoose.model<IUserData>('UserData', userDataSchema);