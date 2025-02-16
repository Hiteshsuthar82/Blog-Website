import { Router } from "express";

import { addComment } from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();



// blog liked

router.post('/addcomment', verifyJWT, addComment);


export default router;