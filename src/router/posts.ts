import { Router } from "express";
import postController from "../controllers/posts";
const router = Router();
router
  .route("/")
  .post(postController.createPost);
export default router;
