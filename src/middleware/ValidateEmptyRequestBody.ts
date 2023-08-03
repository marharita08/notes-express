import { Request, Response, NextFunction } from 'express';
import {ValidationError} from "yup";
import ErrorMessages from "../constants/ErrorMessages";

const validateEmptyRequestBody = (req: Request, res: Response, next: NextFunction) => {
    if (Object.keys(req.body).length !== 0) {
        throw new ValidationError(ErrorMessages.NOT_EMPTY_BODY_ERR);
    }
    next();
}

export default validateEmptyRequestBody;
