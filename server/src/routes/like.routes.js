import { Router } from "express";

import {
    likeBlog
} from '../controllers/like.controller.js'

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();



// blog liked

router.post('/blog-liked', verifyJWT, likeBlog);


export default router;