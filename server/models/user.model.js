import { Schema, model } from "mongoose";
import pkg from "validator";
import bcrypt from "bcrypt";
const { isEmail } = pkg;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    username: {
      type: String,
      required: [true, "Please enter username"],
      unique: [true, "Username already registered"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: [true, "Email already registered"],
      lowercase: true,
      validate: [isEmail, `is not a valid email address!`], // checks if the email is valid or not
    },
    password: {
      type: String,
      required: [true, "Please Enter password"],
      minLength: [6, "Minimum 6 characters"],
    },
    profilePic: {
      type: String,
      default: "https://api.dicebear.com/8.x/fun-emoji/svg?seed=Bear",
    },
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
  },
  {
    // holds the time when the document was created and updated //
    timestamps: true,
  },
);

// userSchema.pre("findOneAndUpdate", async function (next) {
//   const { password } = this.getUpdate();
//   if (password) {
//     const salt = await bcrypt.genSalt(10);
//     this.getUpdate().password = await bcrypt.hash(password, salt);
//   }
//   next();
// });

// static method to login user
userSchema.statics.login = async function (query, password) {
  const user = (await this.findOne({ email: query })) || (await this.findOne({ username: query }));

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw new Error("Incorrect password");
    }
  } else {
    throw new Error("User not found with given email or username");
  }
};

const User = model("user", userSchema);

export default User;
