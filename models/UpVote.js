import mongoose from "mongoose";

const upvoteSchema = new mongoose.Schema(
     {
        postId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
          required: true,
        },
        userId: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
);

upvoteSchema.index({postId: 1, userId: 1}, {unique: true})

export default mongoose.model("upvote", upvoteSchema);