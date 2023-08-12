import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import {checkUnknownFields} from "./CheckUnknownFields";

const validatePostRequest = (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object({
        name: yup.string().required(),
        category_id: yup.string().required(),
        content: yup.string().required()
    });

    checkUnknownFields(req.body, schema.fields);

    schema.validateSync(req.body);
    next();
}

export default validatePostRequest;
