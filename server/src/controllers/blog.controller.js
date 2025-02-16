import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {
  deleteImageOnCloudinary,
  uploadPhotoOnCloudinary as uploadOnCloudinary,
} from "../utils/cloudinary.js";

import sendEmail from "../utils/EmailSent.js";
import { generateOtp } from "../utils/OtpGenrator.js";


// 1. crating blog post
export const createBlog = asyncHandler(async (req, res) => {
    // Get user ID from token
    const userId = req.user.id;
  
    // Get data from request
    const { title, content , isPublished } = req.body;
  
    // Validation
    if (!title || !content) {
      throw new ApiError(400, "Title and content are required!");
    }
  
    // Handling Image Upload
    let imageURL = "";
    if (req.file) {
      const imageRes = await uploadOnCloudinary(req.file.path);
      if (!imageRes) {
        throw new ApiError(500, "Image upload failed!");
      }
      imageURL = imageRes.url;
    }
  
    // Create new blog post
    const blog = await Blog.create({
      title,
      content,
      author: userId,
      image: imageURL || undefined, 
      isPublished
    });
  
    if (!blog) {
      throw new ApiError(500, "Failed to create blog post!");
    }
  
    // Send response
    return res
      .status(201)
      .json(new ApiResponse(201, blog, "Blog post created successfully!"));
  });
  

// 2. edit blog post
export const editBlog = asyncHandler(async (req, res) => {
    // Get blog ID from request params
    const { blogId } = req.params;
    
    // Get user ID from token
    const userId = req.user.id;
  console.log(userId);
    // Get data from request
    const { title, content } = req.body;
  
    // Validation

    // Find the existing blog post
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new ApiError(404, "Blog post not found!");
    }
  
    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== userId) {
      throw new ApiError(403, "You are not authorized to edit this blog post!");
    }
  
    // Handling Image Upload
    if (req.file) {
      const imageRes = await uploadOnCloudinary(req.file.path);
      if (!imageRes) {
        throw new ApiError(500, "Image upload failed!");
      }
      blog.image = imageRes.url;
    }
  
    // Update blog fields if provided
    if (title) blog.title = title;
    if (content) blog.content = content;
  
    // Save updated blog
    await blog.save();
  
    // Send response
    return res.status(200).json(new ApiResponse(200, blog, "Blog post updated successfully!"));
  });



// 3. delete blog post

export const deleteBlog = asyncHandler(async (req, res) => {
    // Get user ID from token
    const userId = req.user.id;
    const blogId = req.params.id;
    
    // Find blog post by ID
    const blog = await Blog.findById(blogId);
    
    if (!blog) {
      throw new ApiError(404, "Blog post not found!");
    }
    
    // Check if user is the author of the blog post
    if (blog.author.toString()!== userId) {
      throw new ApiError(403, "You are not authorized to delete this blog post!");
    }
    
    // Delete blog post from database
    await Blog.findByIdAndDelete(blogId);
    
    // Delete image from cloudinary
    await deleteImageOnCloudinary(blog.image);
    
    // Send response
    return res
     .status(200)
     .json(new ApiResponse(200, null, "Blog post deleted successfully!"));
  });



// 4. get all blog posts only for users
export const getAllBlogsForusers = asyncHandler(async (req, res) => {
    // Get user ID from token
    const userId = req.user.id;
    
    // Find all blog posts where the author matches the user ID
    const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });
    
    if (!blogs) {
      throw new ApiError(404, "No blog posts found!");
    }
    
    // Send response
    return res
     .status(200)
     .json(new ApiResponse(200, blogs, "Blog posts fetched successfully!"));
  });

//   5. get blogs that published is true only og loggedin users


export const getPublishedBlogsForUser = asyncHandler(async (req, res) => {
    // Get user ID from token
    const userId = req.user.id;
    // Find all blog posts where isPublished is true and the author matches the user ID
    const blogs = await Blog.find({ author: userId, isPublished: true })
        .populate("author", "username email avatar") // Populate user data
        .sort({ createdAt: -1 });
    
    if (!blogs) {
      throw new ApiError(404, "No published blog posts found!");
    }
    
    // Send response
    return res
     .status(200)
     .json(new ApiResponse(200, blogs, "Published blog posts fetched successfully!"));
  });

//   6. get not published blog posts

export const getNotPublishedBlogsForUser = asyncHandler(async (req, res) => {
    // Get user ID from token
    const userId = req.user.id;
    
    // Find all blog posts where isPublished is false and the author matches the user ID
    const blogs = await Blog.find({ author: userId, isPublished: false })
        .populate("author", "username email avatar") // Populate user data
        .sort({ createdAt: -1 });
    
    if (!blogs) {
      throw new ApiError(404, "No not published blog posts found!");
    }
    
    // Send response
    return res
     .status(200)
     .json(new ApiResponse(200, blogs, "Not published blog posts fetched successfully!"));
  });


//   published or not published post togole
export const togglePublishStatus = asyncHandler(async (req, res) => {
    // Get blog ID from request params
    const { blogId } = req.params;
  
    // Get user ID from token
    const userId = req.user.id;
  
    // Find the existing blog post
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new ApiError(404, "Blog post not found!");
    }
  
    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== userId) {
      throw new ApiError(403, "You are not authorized to change the publish status of this blog post!");
    }
  
    // Toggle publish status
    blog.isPublished = !blog.isPublished;
  
    // Save updated blog
    await blog.save();
  
    // Send response with the updated status
    return res.status(200).json(new ApiResponse(200, { isPublished: blog.isPublished }, "Blog publish status updated successfully!"));
  });


//   get all the only published true posts from the blog
export const getPublishedBlogs = asyncHandler(async (req, res) => {
    try {
        // Find all blogs where isPublished is true and populate author details
        const blogs = await Blog.find({ isPublished: true }).populate("author", "username avatar email");

        if (!blogs || blogs.length === 0) {
            throw new ApiError(404, "No published blogs found!");
        }

        // Send response
        return res.status(200).json(new ApiResponse(200, blogs, "Published blogs fetched successfully!"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong!");
    }
});
