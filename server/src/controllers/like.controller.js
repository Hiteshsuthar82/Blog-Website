import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import {Like} from "../models/like.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";



// 1. LIKED THE BLOG
export const likeBlog = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    console.log(userId)
    const { blogId } = req.body;

    // Check if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new ApiError(404, "Blog not found!");
    }

    // Check if user already liked the blog
    const existingLike = await Like.findOne({ blog: blogId, likedBy: userId });

    if (existingLike) {
        // Unlike the blog
        await Like.findByIdAndDelete(existingLike._id);
        return res.status(200).json(new ApiResponse(200, null, "Blog unliked successfully!"));
    }

    // Like the blog
    await Like.create({ blog: blogId, likedBy: userId });

    return res.status(201).json(new ApiResponse(201, null, "Blog liked successfully!"));
});

// get total likes of the all blogs









