import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import {Like} from "../models/like.model.js";
import {Comment} from "../models/comment.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


// add comment in all blogs

export const addComment = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { blogId, content } = req.body;

    // Validate input
    if (!content?.trim()) {
        throw new ApiError(400, "Comment content is required!");
    }

    // Check if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new ApiError(404, "Blog not found!");
    }

    // Create new comment
    const comment = await Comment.create({
        content,
        blog: blogId,
        owner: userId,
    });

    if (!comment) {
        throw new ApiError(500, "Failed to add comment!");
    }

    // Add full comment object (not just ID) to blog's comments array
    blog.comments.push({
        _id: comment._id,
        content: comment.content,
        owner: comment.owner,
        createdAt: comment.createdAt,
    });

    await blog.save();

    return res.status(201).json(new ApiResponse(201, comment, "Comment added successfully!"));
});


