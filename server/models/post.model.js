import e from "express";
import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // reference to the User model //
      required: true,
    },
    body: {
      type: String,
      maxLength: 500,
    },
    image: {
      type: String,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        userId: {
          // each comment will have a user id //
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Post = model("Post", postSchema);
export default Post;
