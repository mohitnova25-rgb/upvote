import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
     text: {
        type: String,
        required: true,
        trim: true,
     },
     authorId: {
        type: String,
        required: true,
     },
     upvoteCount: {
        type: Number,
        default: 0,
    },
    replyCount: {
        type: Number,
        default: 0,
    },
  },
  { timestamps: true }
);

postSchema.index({ createdAt: -1, _id: -1 }); //For cursor-based pagination

export default mongoose.model("Post", postSchema);