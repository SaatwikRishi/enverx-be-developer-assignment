import { Request, Response } from "express";
const errorHandler = (error: any, req: Request, res: Response) => {
    res.send(error);
};
export default errorHandler;
