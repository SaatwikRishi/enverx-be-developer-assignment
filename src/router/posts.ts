import { Router } from "express";
import postController from "../controllers/posts";
const router = Router();
router
  .route("/")
  .post(postController.createPost)
  .get(postController.getAllPosts);

router
  .route("/:id")
  .get(postController.getPostById)
  .put(postController.updatePost)
  .delete(postController.deletePost);

export default router;
