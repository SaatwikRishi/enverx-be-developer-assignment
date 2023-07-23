import Joi from "joi";

const getPostByIdSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

const getAllPostsSchema = {
  query: Joi.object({
    sortBy: Joi.string(),
    category: Joi.string(),
  }),
};

const createPostSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryName: Joi.string().min(2).required(),
  }),
};

const updatePostSchema = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    categoryName: Joi.string().min(2),
  })
    .or("title", "content", "categoryName")
    .required(),
};

export {
  getPostByIdSchema,
  updatePostSchema,
  createPostSchema,
  getAllPostsSchema,
};
