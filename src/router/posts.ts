import { Router } from "express";
import postController from "../controllers/posts";
import validator from "../utils/middleware/validation/validator";
import {
  createPostSchema,
  getAllPostsSchema,
  getPostByIdSchema,
  updatePostSchema,
} from "../utils/middleware/validation/schemas";
const router = Router();
router
  .route("/")
  .post(validator(createPostSchema), postController.createPost)
  .get(validator(getAllPostsSchema), postController.getAllPosts);

router
  .route("/:id")
  .get(validator(getPostByIdSchema), postController.getPostById)
  .put(validator(updatePostSchema), postController.updatePost)
  .delete(validator(getPostByIdSchema), postController.deletePost);

export default router;
