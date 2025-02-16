import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


  const likeSchema = new Schema(
    {
      liked: {
        type: Boolean,
        default: true,
      },
      blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
      likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    { timestamps: true }
  );


  likeSchema.plugin(mongooseAggregatePaginate);

export const Like = mongoose.model("Like", likeSchema);
