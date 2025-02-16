import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const blogSchema = new Schema(
    {
      title: {
        type: String,
        // required: true,
        trim: true,
      },
      content: {
        type: String,
        // required: true,
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true,
      },
      image: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZX247oDC-pKUr-kM-K6T6L8VPsRV9V8YY8A&s", 
      },
      likes: [
        {
          type: Schema.Types.ObjectId,
          ref: "Like",
        },
      ],
      comments: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      isPublished: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  );
  


  blogSchema.plugin(mongooseAggregatePaginate);

 export  const Blog = mongoose.model("Blog", blogSchema);

