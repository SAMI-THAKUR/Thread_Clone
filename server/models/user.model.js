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
      default: "https://res.cloudinary.com/ds7w3ysag/image/upload/v1632871230/avatars/avatar1_r8tq9j.png",
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

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10); // generates a salt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

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
    // console.log(user.password);
    // console.log(await bcrypt.hash(password, 10));
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email or username");
};

const User = model("user", userSchema);

export default User;
