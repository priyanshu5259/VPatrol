import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  user_id: Number;
  user_name: String;
  back_accounts: [String];
  id: Number;
  name: String;
  accounts: {
    bank: String,
    branch: String,
    address: String,
    city: String,
    district: String,
    state: String,
    bank_code: String,
    weather: {
      temp: Number,
      humidity: Number,
    },
  }

}

const userSchema = new Schema<IUser>({
  user_id: { type: Number, unique: true, required: true },
  user_name: { type: String, required: true },
  back_accounts: {type:[String],required:true},
  id: {type:Number,unique:true,required:true},
  name: {type:String,required:true},
  accounts: {
    bank: {type:String,required:true},
    branch: {type:String,required:true},
    address: {type:String,required:true},
    city: {type:String,required:true},
    district: {type:String,required:true},
    state: {type:String,required:true},
    bank_code: {type:String,required:true},
    weather: {
      temp: {type:Number,required:true},
      humidity: {type:Number,required:true}
    },
  },
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
