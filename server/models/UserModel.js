import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: { type: String, required: true, minlength: 5, maxlength: 100 },
  password: { type: String, required: true, minlength: 6, maxlength: 100 },
  admin: { type: Boolean, default: false },
  createDate: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
