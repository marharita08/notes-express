import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import {ValidationError} from "yup";
import ErrorMessages from "../constants/ErrorMessages";

const validatePostRequest = (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object({
        name: yup.string().required(),
        category: yup.string().required(),
        content: yup.string().required()
    });

    const unknownFields = Object.keys(req.body).filter((field) => !(field in schema.fields));
    if (unknownFields.length > 0) {
        throw new ValidationError(ErrorMessages.UNKNOWN_FIELDS_ERR(unknownFields.join(', ')));
    }

    schema.validateSync(req.body);
    next();
}

export default validatePostRequest;
