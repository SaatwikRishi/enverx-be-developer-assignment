import { Request, Response } from "express";
import postService from "../services/posts";

const getAllPosts = async (req: Request, res: Response, next: Function) => {
  try {
    const { sortBy, category } = req.query;

    const posts = await postService.getAllPosts(
      sortBy as string,
      category as string
    );
    res.send(posts);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req: Request, res: Response, next: Function) => {
  try {
    const { title, content, categoryName } = req.body;
    const post = await postService.createPost({ title, content, categoryName });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export default { createPost, getAllPosts };
