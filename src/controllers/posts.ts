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

const getPostById = async (req: Request, res: Response, next: Function) => {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id);
    const post = await postService.getPostById(parsedId);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req: Request, res: Response, next: Function) => {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id);
    const { title, content, categoryName } = req.body;
    const post = await postService.updatePost(
      parsedId,
      title,
      content,
      categoryName
    );
    res.json(post);
  } catch (error) {
    next(error);
  }
};
const deletePost = async (req: Request, res: Response, next: Function) => {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id);
    await postService.deletePost(parsedId);
    res.send({
      message: `Post with id ${id} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

export default { createPost, getAllPosts, getPostById, updatePost, deletePost };
