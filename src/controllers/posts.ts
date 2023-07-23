import { Request, Response } from "express";
import postService from "../services/posts";

const createPost = async (req: Request, res: Response, next: Function) => {
  try {
    const { title, content, categoryName } = req.body;
    const post = await postService.createPost({ title, content, categoryName });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export default { createPost };
