import {RouteError} from "../other/classes";
import {NextFunction, Request, Response} from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import {ValidationError} from "yup";

const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof RouteError) {
        res.status(err.status).send(err.message);
    } else if (err instanceof ValidationError) {
        res.status(HttpStatusCodes.BAD_REQUEST).send(err.message);
    } else {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
    }
    console.log(err.stack);
    return next();
}

export default errorHandler;
