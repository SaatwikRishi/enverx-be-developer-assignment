import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
const errorHandler = (error: any, req: Request, res: Response, next: any) => {
  if (error instanceof PrismaClientKnownRequestError) {
    if (["P1001", "P1017", "P1002"].includes(error.code)) {
      return res.status(404).json({
        message: "Something went wrong",
      });
    }
    return res.status(400).json({
      message: error.meta?.cause ?? error.meta ?? "Bad request",
    });
  } else {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
export default errorHandler;
