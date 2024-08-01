import { hash } from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
  },

  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 10);
});

const User = mongoose.model.User || mongoose.model("User", userSchema);
export default User;
