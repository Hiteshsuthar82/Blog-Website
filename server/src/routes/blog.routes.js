import { Router } from "express";

import {
    createBlog,
    editBlog,
    deleteBlog,
    getAllBlogsForusers,
    togglePublishStatus,
    getPublishedBlogs,
    getPublishedBlogsForUser,
    getNotPublishedBlogsForUser
} from '../controllers/blog.controller.js'

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();




// Create a new blog post
router.route("/blogcreate").post(
    upload.fields([{ name: "image", maxCount: 1 }]), 
    verifyJWT, 
    createBlog
  );

//   edit blog
  router.route("/editblog/:blogId").patch(verifyJWT, editBlog);

  
// getuserallblogs
  router.route("/userallblogs").get(verifyJWT, getAllBlogsForusers);
  

//   delete blog
  router.route("/blog/:id").delete(verifyJWT, deleteBlog);


  // toggle publish status
  router.route("/publish-post/:blogId").patch(verifyJWT, togglePublishStatus);

//   get published data of user
  router.route("/published-blogs").get(verifyJWT, getPublishedBlogsForUser);

//   get not published data of user
  router.route("/notpublishedblogs").get(verifyJWT, getNotPublishedBlogsForUser);



//   get publish status all the data
  router.route("/AllPublishedBlogs").get(getPublishedBlogs);


export default router;