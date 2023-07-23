import { Request, Response } from "express";
import Joi from "joi";
const validator =
  (schema: Record<string, Joi.Schema<any>>) =>
  (req: Request, res: Response, next: Function) => {
    for (const key in schema) {
      const { error } = schema[key].validate(req[(key as 'body' | 'params' | 'query' | 'headers')]);
      if (error) {
        console.log(error);
        return res.status(400).json({
          message: error.message,
        });
      }
    }
    next();
  };

export default validator;
