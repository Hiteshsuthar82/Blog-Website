import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";
import {Like} from "../models/like.model.js";

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

      // Get user details
      const user = await User.findById(userId);
      if (!user) {
        throw new ApiError(404, "User not found!");
      }
  
    // Get data from request
    const { title, content , isPublished, image } = req.body;
  
    // Validation
    if (!title || !content) {
      throw new ApiError(400, "Title and content are required!");
    }
  
 
  
    // Create new blog post
    const blog = await Blog.create({
      title,
      content,
      author: userId,
      image, 
      isPublished
    });
  
    if (!blog) {
      throw new ApiError(500, "Failed to create blog post!");
    }

        // Send email only if user is verified
        if (user.isVerified) {
            await sendEmail(user.email, "Blog Posted Successfully", "blog_posted", {
              fullName: user.fullName || user.username,
              blogTitle: blog.title,
            });
          }
  
    // Send response
    return res
      .status(201)
      .json(new ApiResponse(201, blog, "Blog post created successfully!"));
  });


 
// send new blog for all verfied users
export const sendBlogUpdateToVerifiedUsers = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  // Get blog details
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "Blog not found!");
  }

  // Get blog author's ID
  const authorId = blog.author.toString();

  // Get all verified users except the blog author
  const verifiedUsers = await User.find({ isVerified: true, _id: { $ne: authorId } }).select(
    "email fullName username"
  );

  if (verifiedUsers.length === 0) {
    return res.status(400).json(new ApiResponse(400, [], "No verified users found!"));
  }

  // Send email to each verified user
  const emailPromises = verifiedUsers.map((user) =>
    sendEmail(user.email, "🚀 New Blog Alert!", "ALL_blog_posted", {
      fullName: user.fullName || user.username,
      blogTitle: blog.title,
      blogImage: blog.image || "https://example.com/default-blog-image.jpg",
      blogId: blog._id, 
    })
  );

  // Wait for all emails to be sent
  await Promise.all(emailPromises);

  return res.status(200).json(new ApiResponse(200, [], "Emails sent to all verified users!"));
});

// 55. fetch a blog post using only blog id

export const fetchBlogById = asyncHandler(async (req, res) => {
    const { blogId } = req.params;

    // Get blog details
    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new ApiError(404, "Blog not found!");
    }

    // Send response
    return res.status(200).json(new ApiResponse(200, blog, "Blog fetched successfully!"));
});

//   11.send mail all verfied users of new blog post

// export const createBlog = asyncHandler(async (req, res) => {
//     // Get user ID from token
//     const userId = req.user.id;

//     // Get user details
//     const user = await User.findById(userId);
//     if (!user) {
//         throw new ApiError(404, "User not found!");
//     }

//     // Get data from request
//     const { title, content, isPublished } = req.body;

//     // Validation
//     if (!title || !content) {
//         throw new ApiError(400, "Title and content are required!");
//     }

//     // Handling Image Upload
//     let imageURL = "";
//     if (req.file) {
//         const imageRes = await uploadOnCloudinary(req.file.path);
//         if (!imageRes) {
//             throw new ApiError(500, "Image upload failed!");
//         }
//         imageURL = imageRes.url;
//     }

//     // Create new blog post
//     const blog = await Blog.create({
//         title,
//         content,
//         author: userId,
//         image: imageURL || undefined,
//         isPublished,
//     });

//     if (!blog) {
//         throw new ApiError(500, "Failed to create blog post!");
//     }

//     // Fetch all verified users
//     const verifiedUsers = await User.find({ isVerified: true }).select("email fullName username");

//     // Send email to all verified users
//     const emailPromises = verifiedUsers.map((verifiedUser) =>
//         sendEmail(verifiedUser.email, "New Blog Posted", "blog_posted", {
//             fullName: verifiedUser.fullName || verifiedUser.username,
//             blogTitle: blog.title,
//             blogLink: `https://yourwebsite.com/blogs/${blog._id}` // Update with actual blog URL
//         })
//     );

//     // Execute all email promises
//     await Promise.all(emailPromises);

//     // Send response
//     return res
//         .status(201)
//         .json(new ApiResponse(201, blog, "Blog post created successfully! Emails sent to all verified users."));
// });

  

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
      // Find all published blogs and populate author, comments (with owner), and likes (with likedBy user details)
      const blogs = await Blog.find({ isPublished: true })
          .populate("author", "username avatar email")
          .populate({
              path: "comments",
              populate: { path: "owner", select: "username avatar email" }, // Populate owner of each comment
          })
          .populate({
              path: "likes",
              populate: { path: "likedBy", select: "username avatar email" }, // Populate user who liked the blog
          });

      if (!blogs || blogs.length === 0) {
          throw new ApiError(404, "No published blogs found!");
      }

      // Send response
      return res.status(200).json(new ApiResponse(200, blogs, "Published blogs fetched successfully!"));
  } catch (error) {
      throw new ApiError(500, "Something went wrong!");
  }
});


